import { Button } from "./button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Input } from "./input";
import { Label } from "./label";
import { useState } from "react";
import React from "react";
import EditIcon from "../../icons/EditIcon";

const EditTodo = ({ title, id, handleUpdate }) => {
  const [updatedTitle, setUpdateTitle] = useState(title);
  return (
    <Dialog>
      {/* Make sure DialogTrigger wraps only the element that triggers the dialog */}
      <DialogTrigger asChild>
        <EditIcon className="iconHover" />
      </DialogTrigger>

      {/* Dialog Content */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Todo</DialogTitle>
          <DialogDescription>
            Make changes to your todo here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdate(new FormData(e.target)); // Ensure you pass FormData to handleUpdate
          }}
          className="flex flex-col gap-2"
        >
          <Input type="hidden" value={id} name="id" />
          <Label htmlFor="title">Previous Todo</Label>
          <Input
            id="title"
            name="title"
            value={updatedTitle}
            onChange={(e) => setUpdateTitle(e.target.value)}
            className="col-span-3"
          />
          <DialogFooter>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTodo;
