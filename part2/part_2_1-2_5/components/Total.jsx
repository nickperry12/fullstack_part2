const Total = ({ course }) => {
  const exerciseTotal = course.parts.reduce((accum, part) => {
    return accum + part.exercises;
  }, 0)

  return (
    <>
      <p><strong>total of {exerciseTotal} exercises</strong></p>
    </>
  )
}

export default Total;