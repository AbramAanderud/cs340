import { Follow } from "./entity/Follow";
import { DataPage } from "./entity/DataPage";
import { FollowsDAO } from "./dao/FollowsDAO";

class Main {
  async run() {
    const followsDao = new FollowsDAO();

    await Promise.all([
      followsDao.deleteFollow(
        new Follow("@FredFlintstone", "Fred Flintstone", "@AdamWest", "Adam West"),
      ),
      followsDao.deleteFollow(
        new Follow("@FredFlintstone", "Fred Flintstone", "@BarneyRubble", "Barney Rubble"),
      ),
      followsDao.deleteFollow(
        new Follow("@FredFlintstone", "Fred Flintstone", "@ClintEastwood", "Clint Eastwood"),
      ),
      followsDao.deleteFollow(new Follow("@Alice", "Alice", "@ClintEastwood", "Clint Eastwood")),
      followsDao.deleteFollow(new Follow("@Bob", "Bob", "@ClintEastwood", "Clint Eastwood")),
      followsDao.deleteFollow(
        new Follow("@Charlie", "Charlie", "@ClintEastwood", "Clint Eastwood"),
      ),
    ]);

    await Promise.all([
      followsDao.putFollow(
        new Follow("@FredFlintstone", "Fred Flintstone", "@AdamWest", "Adam West"),
      ),
      followsDao.putFollow(
        new Follow("@FredFlintstone", "Fred Flintstone", "@BarneyRubble", "Barney Rubble"),
      ),
      followsDao.putFollow(
        new Follow("@FredFlintstone", "Fred Flintstone", "@ClintEastwood", "Clint Eastwood"),
      ),
      followsDao.putFollow(new Follow("@Alice", "Alice", "@ClintEastwood", "Clint Eastwood")),
      followsDao.putFollow(new Follow("@Bob", "Bob", "@ClintEastwood", "Clint Eastwood")),
      followsDao.putFollow(new Follow("@Charlie", "Charlie", "@ClintEastwood", "Clint Eastwood")),
    ]);

    const page1: DataPage<Follow> = await followsDao.getPageOfFollowees("@FredFlintstone");
    const followees1: Follow[] = page1.values;
    const hasMorePages1: boolean = page1.hasMorePages;

    console.log("Fred follows: " + followees1 + ", and are there more pages? " + hasMorePages1);
    this.verify(hasMorePages1);

    const lastFollowee: string = followees1[followees1.length - 1].followee_handle;

    const page2: DataPage<Follow> = await followsDao.getPageOfFollowees(
      "@FredFlintstone",
      2,
      lastFollowee,
    );
    const followees2: Follow[] = page2.values;
    const hasMorePages2: boolean = page2.hasMorePages;

    console.log(
      "Fred also follows: " + followees2 + ", and are there more pages? " + hasMorePages2,
    );

    const page3: DataPage<Follow> = await followsDao.getPageOfFollowers("@ClintEastwood");
    const followers1: Follow[] = page3.values;
    const hasMorePages3: boolean = page3.hasMorePages;

    console.log(
      "Clint Eastwood is followed by: " +
        followers1 +
        ", and are there more pages? " +
        hasMorePages3,
    );
    this.verify(hasMorePages3);

    const lastFollower: string = followers1[followers1.length - 1].follower_handle;

    const page4: DataPage<Follow> = await followsDao.getPageOfFollowers(
      "@ClintEastwood",
      2,
      lastFollower,
    );
    const followers2: Follow[] = page4.values;
    const hasMorePages4: boolean = page4.hasMorePages;

    console.log(
      "Clint Eastwood is also followed by: " +
        followers2 +
        ", and are there more pages? " +
        hasMorePages4,
    );
  }

  private verify(b: boolean): void {
    if (!b) {
      throw Error("Verification failed.");
    }
  }
}

function run() {
  new Main().run();
}

run();
