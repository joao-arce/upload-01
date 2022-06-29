import Sidebar from './sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const index = ({ children }: LayoutProps) => {
  return (
    <div className="container min-h-screen grid grid-cols-[18rem,1fr]">
      <Sidebar />
      {children}
    </div>
  );
};

export default index;
