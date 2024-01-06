interface TotalProps {
  total: number;
}

export default function Total(props: TotalProps) {
  return (
    <div>Number of exercises {props.total}</div>
  )
}
