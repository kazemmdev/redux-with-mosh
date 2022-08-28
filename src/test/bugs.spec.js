import { addBug, getUnresolvedBugs, loadBugs, resolveBug } from "../store/bugs";
import configureStore from "../store/configureStore";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

describe("bugSlice", () => {
  let fakeAxios;
  let store;

  beforeEach(() => {
    fakeAxios = new MockAdapter(axios);
    store = configureStore();
  });

  //  helpers
  const bugSlice = () => store.getState().entities.bugs;
  const createState = () => ({
    entities: {
      bugs: {
        data: [],
      },
    },
  });

  describe("loading bugs", () => {
    describe("if the bugs exist in the cache", () => {
      it("they should not to be fetched from server again", async () => {
        fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }]);

        await store.dispatch(loadBugs());
        await store.dispatch(loadBugs());

        expect(fakeAxios.history.get.length).toBe(1);
      });
    });
    describe("if the bugs don't exist in the cache", () => {
      it("they should be fetched from server and put the to the catch", async () => {
        fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }]);

        await store.dispatch(loadBugs());

        expect(bugSlice().data.length).toBe(1);
      });
      describe("loading indicator", () => {
        it("should be true while fetching the bugs", () => {
          fakeAxios.onGet("/bugs").reply(() => {
            expect(bugSlice().loading).toBeTruthy();
            return [200, [{ id: 1 }]];
          });

          store.dispatch(loadBugs());
        });
        it("should be false after the bugs are fetched", async () => {
          fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }]);

          await store.dispatch(loadBugs());

          expect(bugSlice().loading).toBe(false);
        });
        it("should be false if the server return an error", async () => {
          fakeAxios.onGet("/bugs").reply(500);
          await store.dispatch(loadBugs());
          expect(bugSlice().loading).toBe(false);
        });
      });
    });
  });

  describe("add bug", () => {
    it("should add the bug to the store if it's saved to the server", async () => {
      // ARRANGE: all the initialization
      const bug = { description: "a" };
      const savedBug = { ...bug, id: 1 };
      fakeAxios.onPost("/bugs").reply(200, savedBug);

      // ACT: triger an action
      await store.dispatch(addBug(bug));

      // ASSERT: the expectation codes
      expect(bugSlice().data).toContainEqual(savedBug);
    });
    it("should not add the bug to the store if it's not saved to the server", async () => {
      const bug = { description: "a" };
      fakeAxios.onPost("/bugs").reply(500);

      await store.dispatch(addBug(bug));

      expect(bugSlice().data).toHaveLength(0);
    });
  });

  describe("resolve bug", () => {
    it("should mark the bug if it's saved to the server", async () => {
      await fakeAxios.onPost("/bugs").reply(200, { id: 1 });
      await fakeAxios.onPatch("/bugs/1").reply(200, { id: 1, resolved: true });

      await store.dispatch(addBug());
      await store.dispatch(resolveBug(1));

      expect(bugSlice().data[0].resolved).toBeTruthy();
    });
    it("should not mark the bug if it's not saved to the server", async () => {
      await fakeAxios.onPost("/bugs").reply(200, { id: 1 });
      await fakeAxios.onPatch("/bugs/1").reply(500);

      await store.dispatch(addBug());
      await store.dispatch(resolveBug(1));

      expect(bugSlice().data[0].resolved).not.toBeTruthy();
    });
  });

  describe("remove bug", () => {});
  
  describe("asign bug to user", () => {});

  describe("selectors", () => {
    it("getUnresolvedBugs", () => {
      const state = createState();
      state.entities.bugs.data = [{ id: 1, resolved: true }, { id: 2 }, { id: 3 }];
      const unresolvedBugs = getUnresolvedBugs(state);

      expect(unresolvedBugs).toHaveLength(2);
    });
  });
});
