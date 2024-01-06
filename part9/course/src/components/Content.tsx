interface ContentProps {
  courses:{ name: string; exerciseCount: number }[];
}


export default function Content(props: ContentProps) {
  const courses = props.courses
  return (
 courses.map(item => <p key={item.name}>{item.name} {item.exerciseCount}</p>)
  )
}
