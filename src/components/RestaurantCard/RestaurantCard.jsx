import "./restaurantCard.scss"
const RestaurantCard = (props)=>{
  //---------Delete funcionality toggler----------"
  return(
    <div className="restaurant">
    <div className="res-container">
      <img src={props.pix} alt="restaurant"/>
      <div className="text">
      <h3>{props.name}</h3>
      <h4>{props.description}</h4>
      <h4>{props.state}</h4>
      </div>
    </div>
    </div>
  )
}
export default RestaurantCard