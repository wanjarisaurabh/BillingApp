const CustomerForm = ({ customerMobile, setCustomerMobile, customerName, setCustomerName }) => {
  return (
    <div className="p-3">
      {/* Customer Name Field */}
      <div className="mb-3">
        <div className="d-flex align-items-center gap-2">
          <label htmlFor="customerName" className="col-4">
            Customer name
          </label>
          <input
            type="text"
            id="customerName"
            className="form-control form-control-sm"
            name="Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Enter customer name"
            required
          />
        </div>
      </div>

      {/* Mobile Number Field */}
      <div className="mb-3">
        <div className="d-flex align-items-center gap-2">
          <label htmlFor="mobileNumber" className="col-4">
            Mobile number
          </label>
          <input
            type="text"
            id="mobileNumber"
            name="Mobile"
            className="form-control form-control-sm"
            value={customerMobile}
            onChange={(e) => setCustomerMobile(e.target.value)}
            placeholder="Enter mobile number"
            maxLength={10}
            minLength={10}
            pattern="[0-9]{10}"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerForm;
