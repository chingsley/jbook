import { useEffect, useState } from 'react';
import './resizable.css';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizableProps: ResizableBoxProps;
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(window.innerWidth * 0.75);

  useEffect(() => {
    let timer: any;
    const listener = () => {
      if(timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        // console.log(window.innerWidth, window.innerHeight);
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        if(window.innerWidth < width) {
          setWidth(window.innerWidth * 0.75);
        }
      }, 10)
    }

    window.addEventListener('resize', listener);

    return () => {
      window.removeEventListener('resize', listener);
    };
  }, [width])

  if(direction === 'horizontal') {
    resizableProps = {
      className: 'resize-horizontal',
      minConstraints: [innerWidth * 0.2, Infinity],
      maxConstraints: [innerWidth * 0.75, Infinity],
      height: Infinity,
      width,
      resizeHandles: ['e'], // position of the resize handle, e: east
      onResizeStop: (event, data) => {
        setWidth(data.size.width);
      }
    }
  } else {
    resizableProps = {
      minConstraints: [Infinity, 24],
      maxConstraints: [Infinity, innerHeight * 0.9],
      height: 300,
      width: Infinity,
      resizeHandles: ['s'] // position of the resize handle, s: south
    }
  }

  return (
    <ResizableBox {...resizableProps}>
      {children}
    </ResizableBox>);
};

export default Resizable;