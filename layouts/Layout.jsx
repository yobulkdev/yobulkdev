import Sidebar from '../components/sidebar/Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-nowrap">
      <Sidebar />
      <div className="flex-1 bg-gray-100">
        {children}{' '}
        {/*        <footer className="flex bottom-0 right-1/3 text-gray-400 ">
          <p className="text-center tracking-tight">
            Developed with &#10084;&#65039; by YoBulk Team!
          </p>
        </footer> */}
      </div>
    </div>
  );
};

export default Layout;
