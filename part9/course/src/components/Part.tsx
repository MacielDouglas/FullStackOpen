import { Parts } from "../types";


const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member ${JSON.stringify(value)}`
    )
  }
  
  export default function Part(props: Parts) {
  return (
    <div>
       {
        props.courses.map((course) => {
            switch(course.kind) {
                case "basic":
                    return <div key={course.name}>
                            <h3>{course.name} {course.exerciseCount}</h3>
                            <p>{course.description}</p>
                        </div>
                    break;  
                case "group":
                    return <div key={course.name}>
                            <h3>{course.name} {course.exerciseCount}</h3> 
                            <p>Project exercises {course.groupProjectCount}</p>
                        </div>; 
                    break;
                case "background": 
                    return <div key={course.name}>
                            <h3>{course.name} {course.exerciseCount}</h3> 
                            <p>{course.description}</p><p>Submit to {course.backgroundMaterial}</p>
                        </div>
                case "special":
                    return <div key={course.name}>
                            <h3>{course.name} {course.exerciseCount}</h3> 
                            <p>{course.description} </p>
                            <p>Required skills {course.requirements.map(r => `${r}, `)}</p>
                        </div>
                default:
                    assertNever(course);
            }
        })
       }
    </div>
  )
}
