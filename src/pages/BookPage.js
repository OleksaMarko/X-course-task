import { Link, useParams } from "react-router-dom";
import data from "../misc/books.json";
import { AppContext } from "../components/AppContext";
import { useContext, useState } from "react";
import Modal from "../components/modal/Modal";

// import BookCalc from "../components/BooksCalc";

import { Button, Breadcrumb, Layout, InputNumber } from "antd";

const { Content } = Layout;

export default function BookPage() {
  const [modalActive, setModalActive] = useState(false);

  const context = useContext(AppContext);
  const [count, setCount] = useState(0);

  const { id } = useParams();
  const book = data.books.find((book) => book.id === Number(id));

  console.log(book);
  const ImageSrc =
    book.image === "" ? "../images/icons/noun-square-cross.svg" : book.image;

  // console.log(count * book.price);

  return (
    <>
      <Content>
        <div className="site-layout-content" style={{ background: "white" }}>
          <Breadcrumb separator="">
            <Breadcrumb.Item>Location</Breadcrumb.Item>
            <Breadcrumb.Separator>:</Breadcrumb.Separator>
            <Breadcrumb.Item>
              <Link to="/books">Books</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item>{book.title}</Breadcrumb.Item>
          </Breadcrumb>

          <div className="book-page">
            <figure className="book-page__img">
              <img
                src={ImageSrc}
                // className="book-page__img"
                alt="book"
                width="350"
              />
            </figure>
            <div className="book-page__info">
              <p className="book-page__title">
                <b>Book name: </b> {book.title}
              </p>
              <p>
                <b>Book author:</b> {book.author}
              </p>
              <p>
                <b>Book level:</b> Beginer
              </p>
              <p>
                <b>Book tags:</b> Core
              </p>
            </div>

            <aside className="book-page counter">
              <table className="table">
                <tbody className="tbody">
                  <tr>
                    <td className="counter__left">
                      <b>Price</b>
                    </td>
                    <td className="counter__right">
                      <b>{book.price}</b>
                    </td>
                  </tr>
                  <tr>
                    <td className="counter__left">
                      <b>Count</b>
                    </td>
                    <td className="counter__right">
                      <b>
                        <label>
                          <InputNumber
                            data-testid="counter"
                            className="count"
                            value={count}
                            type="number"
                            name="count"
                            min={0}
                            max={42}
                            id="count"
                            defaultValue={0}
                            onChange={(value) => {
                              console.log(value, typeof value);
                              setCount(value);
                            }}
                          />
                        </label>
                      </b>
                    </td>
                  </tr>
                  <tr>
                    <td className="counter__left">
                      <b>Total price</b>
                    </td>
                    <td className="counter__right">
                      <b>{(count * book.price).toFixed(2)}</b>
                    </td>
                  </tr>
                  <tr className="counter__last-row">
                    <td className="counter__last-row" colSpan="2">
                      <Button
                        size="middle"
                        type="primary"
                        htmlType="submit"
                        disabled={count <= 0 || count > 42}
                        className="button__add"
                        onClick={() => {
                          context.addToBasket(id, count);
                          console.log(context.basket, id, count);
                          console.log("add to cart");
                          setModalActive(true);
                        }}
                      >
                        Add to cart
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
              {/* <BookCalc id={id} price={book.price} /> */}
            </aside>

            <span className="book-page__description">
              <b>Book descrition:</b>
              <p>{book.description}</p>
            </span>
          </div>

          <Modal
            active={modalActive}
            setActive={setModalActive}
            className="modal"
          >
            <div className="modal__container">
              <h2>Continue to order or to basket ?</h2>
              <div className="modal__buttons">
                <Link to="/basket" onClick={() => setModalActive(false)}>
                  <Button className="modal__buttons modal__buttons-button">
                    Basket
                  </Button>
                </Link>

                <Link to="/books" onClick={() => setModalActive(false)}>
                  <Button className="modal__buttons modal__buttons-button">
                    Books List
                  </Button>
                </Link>
              </div>
            </div>
          </Modal>
        </div>
      </Content>
    </>
  );
}
