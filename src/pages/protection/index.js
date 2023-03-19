import { MenuBar, Container } from '@cp-component';

export default function Page() {
  return (
    <Container fullScreen>
      <div className="text-[72px] font-semibold w-full h-full flex justify-center items-center px-4 md:px-24 pb-40">
        Protection Page
      </div>
      <MenuBar />
    </Container>
  );
}
