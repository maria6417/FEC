import React, { useRef, useState } from 'react';
import ReviewTile from './ReviewTile.jsx';
import styled from 'styled-components';

const StyledList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  min-height: 300px;
  max-height: 470px;
  overflow-y: auto;
`;

function ReviewList(props) {
  const listInnerRef = useRef();

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight + 1 > scrollHeight) {
        console.log("reached bottom, getting more reviews");
        props.scrollMore();
      }
    }
  };

  return (props.reviews.length > 0) ? (
    <StyledList
      onScroll={onScroll}
      ref={listInnerRef}
    >
      {props.reviews.map((review, index) => (
        <ReviewTile
          review={review}
          key={index}
          markHelpful={props.markHelpful}
          report={props.report}
        />
      ))}
    </StyledList>
  ) : (
    <StyledList>
      <h2>
        There are no reviews currently
      </h2>
    </StyledList>
  );
}

export default ReviewList;
