import type { FC } from "react";
import React from "react";
import { ActionModal } from "./index";

interface Resource {
  id: string;
  name: string;
}

export const EditResourceButton: FC<{
  resource: Resource;
  onSave: (name: string) => void;
}> = ({ resource, onSave }) => {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState(resource.name);

  const handleSave = () => {
    onSave(name);
    setOpen(false);
  };

  return (
    <>
      <button
        className="inline-flex items-center rounded-md bg-yellow-500 px-3 py-2 text-sm font-medium text-black hover:bg-yellow-400 focus:outline-none focus-visible:ring focus-visible:ring-offset-2 focus-visible:ring-yellow-300"
        onClick={() => setOpen(true)}
      >
        Edit {resource.name}
      </button>
      <ActionModal
        open={open}
        onCancel={() => setOpen(false)}
        onConfirm={handleSave}
        title="Edit resource"
        confirmText="Save"
        cancelText="Cancel"
        variant="custom"
      >
        <div className="space-y-4">
          <label className="block text-sm">
            <span className="text-gray-300">Name</span>
            <input
              aria-label="Resource name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500"
            />
          </label>
          <div className="text-xs text-gray-400">
            You can add more fields here depending on your model.
          </div>
        </div>
      </ActionModal>
    </>
  );
};
