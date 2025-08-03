import type { FC } from "react";
import React from "react";
import { ActionModal } from "./index";

interface Resource {
  id: string;
  name: string;
}

export const DeleteResourceButton: FC<{
  resource: Resource;
  onDeleted: () => void;
}> = ({ resource, onDeleted }) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      // placeholder: replace with real delete logic
      await new Promise((res) => setTimeout(res, 800));
      onDeleted();
      setOpen(false);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        className="inline-flex items-center rounded-md bg-red-700 px-3 py-2 text-sm font-medium text-red-100 focus:outline-none focus-visible:ring focus-visible:ring-offset-2 focus-visible:ring-red-600"
        onClick={() => setOpen(true)}
      >
        Delete {resource.name}
      </button>
      <ActionModal
        open={open}
        onCancel={() => setOpen(false)}
        onConfirm={handleConfirm}
        title="Delete resource"
        description={`Are you sure you want to delete '${resource.name}'? This cannot be undone.`}
        confirmText="Delete"
        cancelText="Keep"
        loading={loading}
        variant="confirm"
      />
    </>
  );
};
