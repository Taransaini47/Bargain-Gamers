import React, { useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { ChevronLeft } from 'lucide-react';

interface EbookPageProps {
  onBack: () => void;
}

const EbookPage = ({ onBack }: EbookPageProps) => {
  const [currentPage, setCurrentPage] = useState(0);

  // Sample book pages content
  const pages = [
    {
      content: "Page 1 content",
      pageNumber: 1
    },
    {
      content: "Page 2 content",
      pageNumber: 2
    },
    // Add more pages as needed
  ];

  return (
    <div className="min-h-full bg-black">
      <div className="sticky top-0 z-10 bg-transparent p-4 flex items-center">
        <button onClick={onBack} className="p-2">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold ml-2">E-Books</h1>
      </div>

      <div className="p-4">
        <div className="aspect-[3/4] bg-white rounded-lg overflow-hidden">
          <HTMLFlipBook
            width={300}
            height={400}
            size="stretch"
            minWidth={300}
            maxWidth={1000}
            minHeight={400}
            maxHeight={1333}
            showCover={true}
            onFlip={(e: any) => setCurrentPage(e.data)}
            className="book-render"
          >
            {pages.map((page, index) => (
              <div key={index} className="p-4 bg-white text-black">
                <div className="h-full flex flex-col justify-between">
                  <div className="prose max-w-none">
                    {page.content}
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    Page {page.pageNumber}
                  </div>
                </div>
              </div>
            ))}
          </HTMLFlipBook>
        </div>
      </div>
    </div>
  );
};

export default EbookPage;