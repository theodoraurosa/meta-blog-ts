/* eslint-disable @typescript-eslint/no-explicit-any */
export class CollectionPresenter {
  static serialize(output: any) {
    return {
      data: output.items,
      meta: {
        currentPage: output.currentPage,
        lastPage: output.lastPage,
        perPage: output.perPage,
        total: output.total,
      },
    }
  }
}
