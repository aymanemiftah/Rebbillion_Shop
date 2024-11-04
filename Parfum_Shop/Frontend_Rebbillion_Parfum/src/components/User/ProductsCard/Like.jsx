import React, { useContext, useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { DonnerContext } from "../../Context/DonnerContext/DonnerContext";

const IsLike = ({ productId }) => {
    const [isLiked, setIsLiked] = useState(false);
    const { likedProducts, updateLikedProducts } = useContext(DonnerContext);

    useEffect(() => {
      setIsLiked(likedProducts.includes(productId));
  }, [likedProducts, productId]);

    const toggleLike = () => {
      updateLikedProducts(productId, isLiked); // تحديث حالة الإعجاب
      setIsLiked(!isLiked);
    };

    return (
        <button onClick={toggleLike} className={`text-2xl ${isLiked ? 'text-red-500' : 'text-gray-400'}`}>
            {isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
        </button>
    );
};

export default IsLike;
