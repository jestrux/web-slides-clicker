import React from 'react';
import './SlideStack.css';

const SlideStack = ( props ) => {
  const { slides } = props;

  return (
    // <button onClick={ () => props.onAction({type: 'prev'})}>
    //       Prev
    //     </button>
    //     <button onClick={ () => props.onAction({type: 'next'})}>
    //       Next
    //     </button> 
    <div id="slideStack">
      <div id="scroller">
        { 
          slides.map((slide, index) => {
            return ( 
              <div key={index} className="slide" onClick={ () => props.onOpenSlide(index) }>
                Slide { index + 1 }
              </div>
            )
          })
        }
      </div>
    </div>
  );
}
 
export default SlideStack;