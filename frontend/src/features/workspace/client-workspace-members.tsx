"use client";

import * as React from "react";

import { useWorkspaceMembers } from "@/hooks/use-workspace-member";

import { WorkspaceMember } from "@/types";
import { Dialog, DialogContent, DialogTrigger } from "@ui/dialog";

import { AssigneeCard } from "@task/assignee-card";
import { HiUsers } from "react-icons/hi2";

interface Props {
  members: WorkspaceMember[];
}

export const ClientWorkspaceMembers = ({ members }: Props) => {
  const { setMembers } = useWorkspaceMembers();

  React.useEffect(() => {
    setMembers(members);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [members]);

  return (
    <Dialog>
      <DialogTrigger>
        <HiUsers size={20} className="text-gray-700 cursor-pointer mt-1" />
      </DialogTrigger>
      <DialogContent className="space-y-2">
        <b className="my-2 text-[16px] font-medium">Workspace members</b>

        {members?.length > 0 ? (
          <ul className="flex flex-col items-center gap-3 mt-2">
            {members?.map((member) => (
              <li key={member.username} className="flex items-start gap-2">
                <AssigneeCard
                  imgOnly
                  name={member.username}
                  url={member.imageUrl}
                  variant="md"
                />

                <p className="font-medium">{member.username}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center">No members</div>
        )}
      </DialogContent>
    </Dialog>
  );
};
