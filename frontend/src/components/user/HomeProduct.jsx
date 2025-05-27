import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  const { _id, name, price, unit, description, quantity, image } = product;

  return (
    <Link to={`/shop#product-${_id}`}>
      <div className="
        card
        rounded
        border-1 border-[#424242]
        flex flex-col
        bg-[#AED581]
        hover:scale-105 transition duration-300 ease-in-out
        "
      >
        <div className="product-image">
          {console.log(image)}
          <img src={image ? `${image}` : '/placeholder-product.jpg'} alt={name} />
        </div>
        <div className="p-4">
          <h3 className="font-semibold">{name}</h3>
          <p className="font-bold text-[#238823]">₱{price}/{unit}</p>
          <p className="text-sm">{description}</p>
          <p className="text-xs">Stock: {quantity} {unit}</p>
        </div>
      </div>
    </Link>
  );
};

export default Product;

