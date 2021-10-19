const Card = ({ link, handleDelete, handlerSetCurrent }) => {
  return (
    <div className="card mb-1" >
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h4>{link.name}</h4>
          <div>
            <i
              className="material-icons text-danger"
              onClick={() => handleDelete(link.id)}
            >
              close
            </i>
            <i
              className="material-icons"
              onClick={() => handlerSetCurrent(link.id)}
            >
              create
            </i>
          </div>
        </div>
        <p>{link.description}</p>
        <a href={link.url} target="_blank" rel="noopener noreferrer">Go to Website</a>
      </div>
    </div>
  )
}

export default Card
