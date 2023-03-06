import { Link } from "react-router-dom";
import { Card, Button } from "antd";

export default function BookElement({ item }) {
  return (
    <Card
      className="book-card"
      hoverable
      cover={
        <img
          className="book__cover"
          alt={item.title}
          title={item.title}
          src={item.image}
          onError={(event) => {
            event.target.src = "/images/icons/noun-square-cross.svg";
            event.onerror = null;
          }}
        />
      }
    >
      <div className="book__card-info">
        <div className="book__summary">
          <b>
            <div className="book__title">
              {item.title.length > 12
                ? item.title.slice(0, 24) + " ... "
                : item.title}
            </div>
          </b>

          <span className="book__author">{item.author}</span>
        </div>
        <div className="book__actions">
          <div className="book__price-card">
            <b>Price: {item.price}</b>
          </div>
          <Link to={`/book/${item.id}`}>
            <Button>View</Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
