import { IoPersonOutline } from "react-icons/io5";

const employees = [
  { id: 1, name: "Raj", role: "Waiter", salary: 20000 },
  { id: 2, name: "Darshan", role: "Cashier", salary: 10000 },
];

const EmployeeManagement = () => {
  return (
    <>
      <div
        className="bg-lightprimary dark:bg-darkprimary p-5 w-screen"
        style={{ height: "calc(100vh - 100px)" }}
      >
        {/* Employees Section */}
        <div
          className="bg-lightsecondary dark:bg-darksecondary h-full rounded-lg 
        overflow-y-auto p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <p className="flex items-center text-xl md:text-2xl text-black dark:text-white font-semibold">
              <IoPersonOutline className="text-md" /> Employees
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {employees.map((emp) => (
              <div
                key={emp.id}
                className="bg-gradient-to-b from-lightternary to-lightprimary 
                dark:from-darkternary dark:to-darkprimary text-white px-5 py-3 
                rounded-lg shadow-md flex flex-row items-center justify-between"
              >
                <div className="flex items-center justify-center">
                  <span className="text-2xl me-5">
                    <IoPersonOutline className="text-black dark:text-white" />
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-md text-black dark:text-white">
                    {emp.name}
                  </p>
                  <p className="text-xs opacity-80 text-lightgrey dark:text-darkgrey -mt-1">
                    {emp.role}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-black dark:text-white">
                    ₹{emp.salary}
                  </p>
                </div>
                <div className="me-3">
                  <span className="text-xs px-2 py-1 rounded-full bg-lightsecondary dark:bg-darkprimary text-black dark:text-white">
                    0 orders
                  </span>
                </div>
                <div className="me-3">
                  <span className="text-xs px-2 py-1 rounded-full bg-lightsecondary dark:bg-darkprimary text-black dark:text-white">
                    Active
                  </span>
                </div>
                <div className="flex items-center"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeManagement;
