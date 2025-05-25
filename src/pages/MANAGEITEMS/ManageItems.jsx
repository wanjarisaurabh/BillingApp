import ItemForm from '../../component/itemForm/ItemForm';
import ItemList from '../../component/itemList/ItemList';
import './Manageitem.css'
const ManageItems = () => {
  return (
    <div className="items-container text-light">
      <div className="left-column">
        <ItemForm />
      </div>
      <div className="right-column">
        <ItemList/>
      </div>
    </div>
  )
}

export default ManageItems;