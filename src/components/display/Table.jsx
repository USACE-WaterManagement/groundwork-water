import dayjs from "dayjs";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const people = [
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    { name: 'Lindsay Walton2', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
  ]
  
export default function Table({
  h1,
  subTitle,
  heading,
  content,
  precision = 4,
  dateFormat = "MM-DD-YYYY HH:MM",
  ...props
}) {
  return (
    <div className="gw-px-4 gw-sm:px-6 gw-lg:px-8">
      <div className="gw-sm:flex gw-sm:items-center">
        <div className="gw-sm:flex-auto">
          <h1 className="gw-text-base gw-font-semibold gw-leading-6 gw-text-gray-900">Users</h1>
          <p className="gw-mt-2 gw-text-sm gw-text-gray-700">
            A list of all the users in your account including their name, title, email and role.
          </p>
        </div>
        <div className="gw-mt-4 gw-sm:ml-16 gw-sm:mt-0 gw-sm:flex-none">
          <button
            type="button"
            className="gw-block gw-rounded-md gw-bg-indigo-600 gw-px-3 gw-py-2 gw-text-center gw-text-sm gw-font-semibold gw-text-white gw-shadow-sm gw-hover:bg-indigo-500 gw-focus-visible:outline gw-focus-visible:outline-2 gw-focus-visible:outline-offset-2 gw-focus-visible:outline-indigo-600"
          >
            Add user
          </button>
        </div>
      </div>
      <div className="gw-mt-8 gw-flow-root">
        <div className="gw--mx-4 gw--my-2 gw-overflow-x-auto gw-sm:-mx-6 gw-lg:-mx-8">
          <div className="gw-inline-block gw-min-w-full gw-py-2 gw-align-middle gw-sm:px-6 gw-lg:px-8">
            <table className="gw-min-w-full gw-divide-y gw-divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="gw-py-3.5 gw-pl-4 gw-pr-3 gw-text-left gw-text-sm gw-font-semibold gw-text-gray-900 gw-sm:pl-3">
                    Name
                  </th>
                  <th scope="col" className="gw-px-3 gw-py-3.5 gw-text-left gw-text-sm gw-font-semibold gw-text-gray-900">
                    Title
                  </th>
                  <th scope="col" className="gw-px-3 gw-py-3.5 gw-text-left gw-text-sm gw-font-semibold gw-text-gray-900">
                    Email
                  </th>
                  <th scope="col" className="gw-px-3 gw-py-3.5 gw-text-left gw-text-sm gw-font-semibold gw-text-gray-900">
                    Role
                  </th>
                  <th scope="col" className="gw-relative gw-py-3.5 gw-pl-3 gw-pr-4 gw-sm:pr-3">
                    <span className="gw-sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="gw-bg-white">
                {people.map((person) => (
                  <tr key={person.email} className="gw-even:bg-gray-50">
                    <td className="gw-whitespace-nowrap gw-py-4 gw-pl-4 gw-pr-3 gw-text-sm gw-font-medium gw-text-gray-900 gw-sm:pl-3">
                      {person.name}
                    </td>
                    <td className="gw-whitespace-nowrap gw-px-3 gw-py-4 gw-text-sm gw-text-gray-500">{person.title}</td>
                    <td className="gw-whitespace-nowrap gw-px-3 gw-py-4 gw-text-sm gw-text-gray-500">{person.email}</td>
                    <td className="gw-whitespace-nowrap gw-px-3 gw-py-4 gw-text-sm gw-text-gray-500">{person.role}</td>
                    <td className="gw-relative gw-whitespace-nowrap gw-py-4 gw-pl-3 gw-pr-4 gw-text-right gw-text-sm gw-font-medium gw-sm:pr-3">
                      <a href="#" className="gw-text-indigo-600 gw-hover:text-indigo-900">
                        Edit<span className="gw-sr-only">, {person.name}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
