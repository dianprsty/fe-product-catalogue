import { Carousel } from 'antd';


const CarrouselMain = () => (
  <Carousel autoplay>
    <img 
      className='object-cover object-center h-96 w-full aspect-video'
      src={'/images/1.png'} alt='' />
    <img 
        className='object-cover object-center h-96 w-full aspect-video'
        src={'/images/2.png'} alt='' />
    <img 
        className='object-cover object-center h-96 w-full aspect-video'
        src={'/images/3.png'} alt='' />
    <img 
        className='object-cover object-center h-96 w-full aspect-video'
        src={'/images/4.png'} alt='' />
    {/* <div>
      <h3 style={contentStyle}>2</h3>
    </div>
    <div>
      <h3 style={contentStyle}>3</h3>
    </div>
    <div>
      <h3 style={contentStyle}>4</h3>
    </div> */}
  </Carousel>
);
export default CarrouselMain;