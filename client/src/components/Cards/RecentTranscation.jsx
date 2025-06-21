import React from "react";

const RecentTranscation = () => {
  return (
    <div className="max-w-screen p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h3 className="text-2xl font-semibold leading-none tracking-tight">
        Recent Transaction
      </h3>
      <p className="text-sm text-muted-foreground">
        Your most recent 5 transactions
      </p>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 rounded-lg border bg-card animate-fade-up">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center">
              <div>
                <div className="font-medium">Tite</div>
                <div className="text-sm text-muted-foreground">$1232</div>
              </div>
            </div>
          </div>
          <div className="text-red-600 dark:text-red-400 font-medium">
            $1243
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentTranscation;
