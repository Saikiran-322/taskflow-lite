import { prisma } from "../prisma/index";

export const TaskService = {
  getAll: () => {
    return prisma.task.findMany();
  },

  getOne: (id: string) => {
    return prisma.task.findUnique({ where: { id } });
  },

  create: (data: { title: string; description?: string }) => {
    return prisma.task.create({ data });
  },

  update: (id: string, data: any) => {
    return prisma.task.update({
      where: { id },
      data,
    });
  },

  remove: (id: string) => {
    return prisma.task.delete({ where: { id } });
  },
};
