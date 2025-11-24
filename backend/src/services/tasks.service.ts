import { prisma } from "../prisma/index";

export const TaskService = {
  // ---------------------
  // ORIGINAL CRUD METHODS
  // ---------------------
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

  // ---------------------------------
  // NEW: FILTER + PAGINATION SUPPORT
  // ---------------------------------
  getFiltered: (
    status?: string,
    from?: string,
    to?: string,
    page: number = 1,
    limit: number = 10
  ) => {
    const where: any = {};

    if (status) where.status = status;

    if (from || to) {
      where.createdAt = {};
      if (from) where.createdAt.gte = new Date(from);
      if (to) where.createdAt.lte = new Date(to);
    }

    return prisma.task.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
    });
  },

  countFiltered: (status?: string, from?: string, to?: string) => {
    const where: any = {};

    if (status) where.status = status;

    if (from || to) {
      where.createdAt = {};
      if (from) where.createdAt.gte = new Date(from);
      if (to) where.createdAt.lte = new Date(to);
    }

    return prisma.task.count({ where });
  },

  // ---------------------------
  // NEW: SEARCH FUNCTIONALITY
  // ---------------------------
  search: (query: string) => {
    return prisma.task.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
        ],
      },
      orderBy: { createdAt: "desc" },
    });
  },
};
