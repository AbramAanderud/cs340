import {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  QueryCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { Follow } from "../entity/Follow";
import { DataPage } from "../entity/DataPage";

export class FollowsDAO {
  readonly tableName = "follows";
  readonly indexName = "follows_index";

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

    return output.Item == undefined
      ? undefined
      : new Follow(
          output.Item[this.followerHandleAttr],
          output.Item[this.followerNameAttr],
          output.Item[this.followeeHandleAttr],
          output.Item[this.followeeNameAttr],
        );
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
      UpdateExpression:
        "SET " +
        this.followerNameAttr +
        " = :followerName, " +
        this.followeeNameAttr +
        " = :followeeName",
      ExpressionAttributeValues: {
        ":followerName": newFollowerName,
        ":followeeName": newFolloweeName,
      },
    };

    await this.client.send(new UpdateCommand(params));
  }

  async deleteFollow(follow: Follow): Promise<void> {
    const params = {
      TableName: this.tableName,
      Key: {
        [this.followerHandleAttr]: follow.follower_handle,
        [this.followeeHandleAttr]: follow.followee_handle,
      },
    };

    await this.client.send(new DeleteCommand(params));
  }

  async getPageOfFollowees(
    followerHandle: string,
    pageSize: number = 2,
    lastFolloweeHandle: string | undefined = undefined,
  ): Promise<DataPage<Follow>> {
    const params = {
      TableName: this.tableName,
      KeyConditionExpression: this.followerHandleAttr + " = :fh",
      ExpressionAttributeValues: {
        ":fh": followerHandle,
      },
      Limit: pageSize,
      ExclusiveStartKey:
        lastFolloweeHandle === undefined
          ? undefined
          : {
              [this.followerHandleAttr]: followerHandle,
              [this.followeeHandleAttr]: lastFolloweeHandle,
            },
    };

    const items: Follow[] = [];
    const data = await this.client.send(new QueryCommand(params));
    const hasMorePages = data.LastEvaluatedKey !== undefined;

    data.Items?.forEach((item) =>
      items.push(
        new Follow(
          item[this.followerHandleAttr],
          item[this.followerNameAttr],
          item[this.followeeHandleAttr],
          item[this.followeeNameAttr],
        ),
      ),
    );

    return new DataPage<Follow>(items, hasMorePages);
  }

  async getPageOfFollowers(
    followeeHandle: string,
    pageSize: number = 2,
    lastFollowerHandle: string | undefined = undefined,
  ): Promise<DataPage<Follow>> {
    const params = {
      TableName: this.tableName,
      IndexName: this.indexName,
      KeyConditionExpression: this.followeeHandleAttr + " = :feh",
      ExpressionAttributeValues: {
        ":feh": followeeHandle,
      },
      Limit: pageSize,
      ExclusiveStartKey:
        lastFollowerHandle === undefined
          ? undefined
          : {
              [this.followerHandleAttr]: lastFollowerHandle,
              [this.followeeHandleAttr]: followeeHandle,
            },
    };

    const items: Follow[] = [];
    const data = await this.client.send(new QueryCommand(params));
    const hasMorePages = data.LastEvaluatedKey !== undefined;

    data.Items?.forEach((item) =>
      items.push(
        new Follow(
          item[this.followerHandleAttr],
          item[this.followerNameAttr],
          item[this.followeeHandleAttr],
          item[this.followeeNameAttr],
        ),
      ),
    );

    return new DataPage<Follow>(items, hasMorePages);
  }
}
