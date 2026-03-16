import { FollowsDAO } from "./FollowsDAO";

async function main() {
  console.log("Starting test...");
  const dao = new FollowsDAO();

  await dao.putFollow({
    follower_handle: "@FredFlintstone",
    follower_name: "Fred Flintstone",
    followee_handle: "@ClintEastwood",
    followee_name: "Clint Eastwood",
  });

  const item1 = await dao.getFollow("@FredFlintstone", "@ClintEastwood");
  console.log("Original item:", item1);

  await dao.updateFollowNames(
    "@FredFlintstone",
    "@ClintEastwood",
    "Fred Flintstone Updated",
    "Clint Eastwood Updated",
  );

  const item2 = await dao.getFollow("@FredFlintstone", "@ClintEastwood");
  console.log("Updated item:", item2);

  await dao.deleteFollow("@FredFlintstone", "@ClintEastwood");

  const item3 = await dao.getFollow("@FredFlintstone", "@ClintEastwood");
  console.log("After delete:", item3);
}

main().catch((error) => {
  console.error("Error:", error);
});
