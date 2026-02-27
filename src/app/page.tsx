'use cache'
import Today from "@/components/Today";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"


export default async function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      {/*<main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start"></main>*/}
      <ResizablePanelGroup
        orientation="horizontal"
        className="bg-red-100 min-h-screen"
      >
        <ResizablePanel defaultSize="75%">
          <div className="flex h-full items-center justify-center p-6 bg-pink-500">
            <span className="font-semibold">Content</span>
          </div>
        </ResizablePanel>
          <ResizableHandle withHandle />
        <ResizablePanel defaultSize="75%" maxSize={"50%"} minSize={"15%"}>
          <div className="flex h-full items-center justify-center p-6 bg-black">
            <Today/>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

    </div>
  );
}
