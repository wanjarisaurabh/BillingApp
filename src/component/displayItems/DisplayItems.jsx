import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext.jsx";
import Item from "../item/Item.jsx";
import SearchBox from "../searchBo/SearchBox.jsx";

const DisplayItems = ({ selectedCategory }) => {
  const { item } = useContext(AppContext); // assuming item is your array
  const [searchText, setSearchText] = useState("");

  const filteredItems = item.filter(it => {
    // return it.name.toLowerCase().includes(searchText.toLowerCase());
    if (!selectedCategory) return true;
    return it.categoryId == selectedCategory;

  }).filter(it => it.name.toLowerCase().includes(searchText.toLowerCase()));

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <SearchBox onSearch={setSearchText} />
      </div>

      <div className="row g-3">
        {filteredItems.map((it, index) => (
          <div key={index} className="col-12 col-md-4">
            <Item
              itemName={it.name}
              itemPrice={it.price}
              itemImage={it.imgUrl}
              itemId={it.itemId}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayItems;
