// components/sidebar/sidebarData.ts

export type SidebarItem = {
  id: string;
  title: string;
  type: "page" | "folder";
  children?: SidebarItem[];
};

export const sidebarItems: SidebarItem[] = [
  {
    id: "1",
    title: "Personal",
    type: "folder",
    children: [
      {
        id: "1-1",
        title: "Tasks",
        type: "page",
      },
      {
        id: "1-2",
        title: "Reading List",
        type: "page",
      },
    ],
  },
  {
    id: "2",
    title: "Work",
    type: "folder",
    children: [
      {
        id: "2-1",
        title: "Projects",
        type: "folder",
        children: [
          {
            id: "2-1-1",
            title: "Notion Clone",
            type: "page",
          },
        ],
      },
    ],
  },
];
