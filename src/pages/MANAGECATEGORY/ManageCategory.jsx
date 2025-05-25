import './ManageCategory.css'
import CategoryForm from '../../component/categorForm/CategoryForm'
import CategoryList from '../../component/categoryList/CategoryList';
const ManageCategory = () => {
  return (
    <div className="category-container text-light">
      <div className="left-column">
        <CategoryForm />

      </div>
      <div className="right-column">
        <CategoryList />
      </div>
    </div>
  )
}

export default ManageCategory;