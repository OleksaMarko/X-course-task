import { AppContext } from "../components/AppContext";
import { useContext } from "react";
import data from "../misc/books.json";
import { Breadcrumb, Layout, Button, Table } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

const { Content } = Layout;

export default function Basket() {
  const context = useContext(AppContext);
  let { books } = data;
  let booksBasket = [];

  const columns = [
    {
      title: "",
      dataIndex: "position",
    },
    {
      title: "Book name",
      dataIndex: "title",
    },
    {
      title: "Amount",
      dataIndex: "count",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Total price",
      dataIndex: "amount",
      align: "right",
    },
  ];

  if (Object.keys(context.basket).length === 0) {
    return (
      <>
        <Content>
          <div className="site-layout-content">
            <Breadcrumb separator="">
              <Breadcrumb.Item>Location</Breadcrumb.Item>
              <Breadcrumb.Separator>:</Breadcrumb.Separator>
              <Breadcrumb.Item>Basket</Breadcrumb.Item>
            </Breadcrumb>
            <div className="basket">
              <div className="basket__button">
                <Button disabled={true}>Purchase</Button>
              </div>
              <div className="basket__content">
                <ShoppingCartOutlined style={{ fontSize: 72 }} />
                <span>Cart empty...</span>
              </div>
            </div>
          </div>
        </Content>
      </>
    );
  }

  const totalPriceStorage = [];

  const bookList = Object.entries(context.basket);

  const list = bookList.map((book, index) => {
    const bookFromList = books.find((element) => {
      console.log(element.id);
      return element.id === Number(book[0]);
    });
    // console.log(book, books, bookFromList);

    booksBasket.push({
      ...bookFromList,
      position: index + 1,
      count: book[1],
      amount: (bookFromList.price * book[1]).toFixed(2),
    });

    totalPriceStorage.push((bookFromList.price * book[1]).toFixed(2));

    return (
      <div item={book} key={`${index}-${book.title}`}>
        {`${index + 1}.`} {book[0]} {bookFromList.title} {bookFromList.author},
        amount - {book[1]}, price - {bookFromList.price}, total price -{" "}
        {(book[1] * bookFromList.price).toFixed(2)}
      </div>
    );
  });

  const totalPrice = totalPriceStorage.reduce((m, b) => +m + +b, 0).toFixed(2);

  return (
    <>
      <Content>
        <div className="site-layout-content" style={{ background: "white" }}>
          <Breadcrumb separator="">
            <Breadcrumb.Item>Location</Breadcrumb.Item>
            <Breadcrumb.Separator>:</Breadcrumb.Separator>
            <Breadcrumb.Item>Basket</Breadcrumb.Item>
          </Breadcrumb>
          <div className="basket">
            <div className="basket__button">
              <Button
                onClick={() => {
                  context.clearBasket();
                }}
              >
                Purchase
              </Button>
            </div>
            <Table
              className="basket__table"
              columns={columns}
              dataSource={booksBasket}
              size="middle"
              pagination={false}
            />
            <div className="total-price">
              <b>Total price, $ {totalPrice}</b>
            </div>
          </div>
          {/* <Button
            onClick={() => {
              context.clearBasket();
            }}
          >
            Purchase
          </Button> */}
        </div>
      </Content>
    </>
  );
}
