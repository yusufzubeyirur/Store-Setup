import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useFetch from "../utilities/useFetch";
import ProductDelivery from "./ProductDelivery";

export default function ProductDetails() {
  const params = useParams();

  const [product, setProduct] = useState({});
  const [showDeliveryNotes, setShowDeliveryNotes] = useState(false);
  const { get } = useFetch(
    "https://router-12f10-default-rtdb.europe-west1.firebasedatabase.app/"
  );

  const id = params.id;

  useEffect(() => {
    get(`productdetails/id${id}.json`)
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleDeliveryNotesClick = () => {
    setShowDeliveryNotes(true);
  };

  return (
    <div>
      {product && (
        <div>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <h3>${product.price}</h3>
          <img src={product.image} width="100" alt={product.name} />

          <p
            onClick={handleDeliveryNotesClick}
            style={{ cursor: "pointer", color: "blue" }}
          >
            View delivery notes
          </p>

          {/* Teslimat notları bileşeni */}
          {showDeliveryNotes && <ProductDelivery />}
        </div>
      )}
    </div>
  );
}
