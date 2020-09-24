import React, { useState, useRef, useEffect } from "react";
import { wrapper, left, right, card } from "./canvas.scss";
import { useMeasure, useScroll, useScrolling, useWindowSize } from 'react-use';

const Wrapper = ({ children }) => {
  return <div className={wrapper}>{children}</div>;
};

const Card = ({ title }) => {
  return <div className={card}>{title}</div>;
}

const Left = ({ children, siblingScrollPosition }) => {
  const { height } = useWindowSize();
  const ref = useRef(null);

  useEffect(() => {
    const { current } = ref;
    current.scrollTop = current.scrollHeight - height - siblingScrollPosition;
  });

  return <div ref={ref} className={left}>{children.reverse()}</div>;
};

const Right = React.forwardRef(({ children }, ref) => {
  // console.log(ref)
  return <div className={right} ref={ref}>{children}</div>;
});

export default () => {
  const [value] = useState(Date.now());
  const cardsLeft = [...Array(6)].map((v, i) => {
    return { title: `#${i}` };
  });
  const cardsRight = [...Array(6)].map((v, i) => {
    return { title: `#${i}` };
  });

  const columnRight = useRef(null);
  const { y } = useScroll(columnRight);
  const isScrolling = useScrolling(columnRight);

  // console.log(columnRight, isScrolling, y);

  return (
    <Wrapper>
      <Left siblingScrollPosition={y}>
        {cardsLeft.map(({ title }, i) => (
          <Card title={title} key={i}></Card>
        ))}
      </Left>
      <Right ref={columnRight}>
        {cardsRight.map(({ title }, i) => (
          <Card title={title} key={i}></Card>
        ))}
      </Right>
    </Wrapper>
  );
};