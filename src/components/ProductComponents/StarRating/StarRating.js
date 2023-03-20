import s from './StarRating.module.css'

const StarRating = ({ rate }) => {
  const startArr = [1, 2, 3, 4, 5]
  const arrWidthStar = startArr.map((el) => {
    if (el === rate) {
      return 1
    }

    if (el >= rate && rate >= el - 1) {
      return rate - (el - 1)
    }

    if (el <= rate && el - 1 <= rate) {
      return 1
    }

    return 0
  })

  return (
    <div className={s.stars__wrapper}>
      {arrWidthStar.map((widthStar, i) => (
        <Star key={i} percentageWidth={widthStar} />
      ))}
    </div>
  )
}

const Star = ({ percentageWidth }) => {
  const starStyle = {
    width: `${percentageWidth * 100}%`,
  }

  return (
    <div className={s.star__wrapper}>
      <div style={starStyle} className={s.star__body}></div>
    </div>
  )
}

export default StarRating
