import {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export type Follow = {
  follower_handle: string;
  follower_name: string;
  followee_handle: string;
  followee_name: string;
};

export class FollowsDAO {
  readonly tableName = "follows";
  readonly followerHandleAttr = "follower_handle";
  readonly followerNameAttr = "follower_name";
  readonly followeeHandleAttr = "followee_handle";
  readonly followeeNameAttr = "followee_name";

  private readonly client = DynamoDBDocumentClient.from(
    new DynamoDBClient({ region: "us-west-2" }),
  );

  async putFollow(follow: Follow): Promise<void> {
    const params = {
      TableName: this.tableName,
      Item: {
        [this.followerHandleAttr]: follow.follower_handle,
        [this.followerNameAttr]: follow.follower_name,
        [this.followeeHandleAttr]: follow.followee_handle,
        [this.followeeNameAttr]: follow.followee_name,
      },
    };

    await this.client.send(new PutCommand(params));
  }

  async getFollow(followerHandle: string, followeeHandle: string): Promise<Follow | undefined> {
    const params = {
      TableName: this.tableName,
      Key: {
        [this.followerHandleAttr]: followerHandle,
        [this.followeeHandleAttr]: followeeHandle,
      },
    };

    const output = await this.client.send(new GetCommand(params));

    if (output.Item === undefined) {
      return undefined;
    }

    return {
      follower_handle: output.Item[this.followerHandleAttr],
      follower_name: output.Item[this.followerNameAttr],
      followee_handle: output.Item[this.followeeHandleAttr],
      followee_name: output.Item[this.followeeNameAttr],
    };
  }

  async updateFollowNames(
    followerHandle: string,
    followeeHandle: string,
    newFollowerName: string,
    newFolloweeName: string,
  ): Promise<void> {
    const params = {
      TableName: this.tableName,
      Key: {
        [this.followerHandleAttr]: followerHandle,
        [this.followeeHandleAttr]: followeeHandle,
      },
      UpdateExpression: "SET follower_name = :followerName, followee_name = :followeeName",
      ExpressionAttributeValues: {
        ":followerName": newFollowerName,
        ":followeeName": newFolloweeName,
      },
    };

    await this.client.send(new UpdateCommand(params));
  }

  async deleteFollow(followerHandle: string, followeeHandle: string): Promise<void> {
    const params = {
      TableName: this.tableName,
      Key: {
        [this.followerHandleAttr]: followerHandle,
        [this.followeeHandleAttr]: followeeHandle,
      },
    };

    await this.client.send(new DeleteCommand(params));
  }
}
