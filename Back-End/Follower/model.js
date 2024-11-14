import { FollowerRepository } from './followerRepository.js';

export class Follower {
    followerId;
    followingId;

    #repository;

    constructor() {
        this.#repository = new FollowerRepository();
    }

    async followUser() {
        if (!this.followerId || !this.followingId) {
            throw {
                code: 500,
                message: 'Seguidor ou seguido não informado!'
            };
        }

        try {
            return await this.#repository.followUser(this.followerId, this.followingId);
        } catch (error) {
            console.error('Error following user:', error);
            throw error;
        }
    }

    async unfollowUser() {
        if (!this.followerId || !this.followingId) {
            throw {
                code: 500,
                message: 'Seguidor ou seguido não informado!'
            };
        }

        try {
            return await this.#repository.unfollowUser(this.followerId, this.followingId);
        } catch (error) {
            console.error('Error unfollowing user:', error);
            throw error;
        }
    }

    async getFollowers(userId) {
        try {
            return await this.#repository.getFollowers(userId);
        } catch (error) {
            console.error('Error fetching followers:', error);
            throw error;
        }
    }

    async getFollowing(userId) {
        try {
            return await this.#repository.getFollowing(userId);
        } catch (error) {
            console.error('Error fetching following:', error);
            throw error;
        }
    }
}
