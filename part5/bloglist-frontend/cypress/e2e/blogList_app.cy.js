describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Jose Camelo',
      username: 'kanguru',
      password: '123456',
    }
    const user2 = {
      name: 'Daniel Willians',
      username: 'danWill',
      password: 'qwerty',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.request('POST', 'http://localhost:3003/api/users/', user2)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.visit('http://localhost:3000')
    cy.contains('Log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.visit('http://localhost:3000')
      cy.get('#username').type('kanguru')
      cy.get('#password').type('123456')
      cy.get('#login_btn').click()

      cy.contains('Jose Camelo logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('kanguru')
      cy.get('#password').type('xxxx')
      cy.get('#login_btn').click()
      cy.get('.error')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.visit('http://localhost:3000')
      cy.get('#username').type('kanguru')
      cy.get('#password').type('123456')
      cy.get('#login_btn').click()
    })

    it('A blog can be created', function () {
      cy.contains('button', 'new note').click()
      cy.get('#title').type('Creating a new blog with Cypress')
      cy.get('#author').type('Jose Camelo')
      cy.get('#url').type('www.test.com/tes/cypress')
      cy.contains('button', 'create').click()
      cy.get('.message').should(
        'contain',
        'A new blog: Creating a new blog with Cypress added.',
      )
      cy.contains('button', 'Logout').click()
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.visit('http://localhost:3000')
      cy.get('#username').type('danWill')
      cy.get('#password').type('qwerty')
      cy.get('#login_btn').click()
    })

    it("can't see delete button for a blog", async function () {
      cy.contains('Daniel Willians logged in')
      cy.contains('button', 'new note').click()
      cy.get('#title').type('Creating a new blog with Cypress')
      cy.get('#author').type('Jose Camelo')
      cy.get('#url').type('www.test.com/tes/cypress')
      cy.contains('button', 'create').click()
      cy.get('.message').should(
        'contain',
        'A new blog: Creating a new blog with Cypress added.',
      )
      cy.contains('button', 'Logout').click()

      cy.get('#username').type('kanguru')
      cy.get('#password').type('123456')
      cy.get('#login_btn').click()

      cy.contains('Jose Camelo logged in')
      cy.contains('button', 'view').click()
      cy.get('button').contains('remove').should('not.exist')
    })
  })
})
