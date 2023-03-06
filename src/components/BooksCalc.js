import React from "react";
import { useContext, useState } from "react";
import { AppContext } from "./AppContext";

import { Button, InputNumber } from "antd";

export default function BookCalc({ id, price }) {
  const context = useContext(AppContext);

  const [count, setCount] = useState(0);

  return (
    <table className="table">
      <tbody className="tbody">
        <tr>
          <td className="counter__left">
            <b>Price</b>
          </td>
          <td className="counter__right">
            <b>{price}</b>
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
                  value={count}
                  type="number"
                  name="count"
                  min={0}
                  max={42}
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
            <b>{(count * price).toFixed(2)}</b>
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
                // setModalActive(true);
              }}
            >
              Add to cart
            </Button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
