import BookElement from "../components/BookElement";
import data from "../misc/books.json";
import { useState } from "react";
import { Breadcrumb, Layout, Input, Select } from "antd";

const { Search } = Input;
const { Content } = Layout;

const SORTING_MAP = {
  0: [0, 1000000000],
  1: [0, 15],
  2: [15, 30],
  3: [30, 1000000000],
};

export default function Books() {
  const [priceRange, setPriceRange] = useState("0");
  const [searchInput, setSearchInput] = useState("");

  let { books } = data;
  console.log(data);
  console.log(books);
  books = books.filter((book) => {
    if (priceRange === "0") {
      return true;
    } else {
      const [from, to] = SORTING_MAP[priceRange];
      return book.price >= from && book.price <= to;
    }
  });

  books = books.filter((book) => {
    return book.title
      .toLocaleLowerCase()
      .match(searchInput.toLocaleLowerCase());
  });

  const list = books.map((book, index) => {
    return <BookElement item={book} key={`${index}-${book.title}`} />;
  });

  const handleMenuClick = (e) => {
    setPriceRange(e.key);
    // console.log("click", e.key, e);
  };

  return (
    <>
      <Content>
        <div className="site-layout-content">
          <Breadcrumb separator="">
            <Breadcrumb.Item>Location</Breadcrumb.Item>
            <Breadcrumb.Separator>:</Breadcrumb.Separator>
            <Breadcrumb.Item>Books</Breadcrumb.Item>
          </Breadcrumb>
          <div className="books__input">
            <Search
              className="nosubmit"
              type="search"
              id="fname"
              name="fname"
              placeholder="Search by book name"
              allowClear
              // onSearch={(value) => {
              //   console.log(value);
              //   setSearchInput(value);
              // }}
              value={searchInput}
              onChange={(e) => {
                console.log("search done");
                console.log(e.currentTarget.value);

                setSearchInput(e.currentTarget.value);
              }}
              style={{ width: 200 }}
            />

            <Select
              labelInValue
              defaultValue={{
                value: "0",
                key: "0",
                label: "Price",
              }}
              style={{
                width: 120,
              }}
              onChange={handleMenuClick}
              options={[
                {
                  value: "0",
                  key: "0",
                  label: "All products",
                },
                {
                  value: "1",
                  key: "1",
                  label: "0 - 15",
                },
                {
                  value: "2",
                  key: "2",
                  label: "15-30",
                },
                {
                  value: "3",
                  key: "3",
                  label: "30, and more",
                },
              ]}
            />
          </div>

          <div className="bookshelf__container">{list}</div>
        </div>
      </Content>
    </>
  );
}
