import React from 'react';
import './CurrentSlide.css';

const SlideStack = ( props ) => {
  const { slide } = props;

  return (
    <div id="CurrentSlide">
    { 
      slide && <h2>{ slide.name }</h2>
    }
    </div>
  );
}
 
export default SlideStack;