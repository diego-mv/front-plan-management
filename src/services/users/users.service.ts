import { userAdapter } from "../../adapters/users/user.adapter";
import { UserDto } from "../../models";
import { ResultPage } from "../../models/common/resultPage.model";
import { createUserDto } from "../../models/dto/users/createUser.dto";
import { CreateUserSkillDto } from "../../models/dto/users/createUserSkill.dto";
import { User } from "../../models/users/user.model";
import axios from '../../utilities/axios.utility';

export class UsersService {

    public searchUsers = async (userData: string | null, skillId: string | null, level: string | null): Promise<User[]> => {
        try {
            const response = await axios.get(`/users/searchUsers?userData=${userData}&skillId=${skillId}&level=${level}`);

            const users: User[] = [];
            (response.data as UserDto[]).map(user => {
                users.push(userAdapter(user)!);
            });

            return users;
        } catch (error) {
            throw error;
        }
    }

    public getAllUsers = async (page: number, rowsPerPage: number): Promise<ResultPage<User>> => {
        try {
            const response = await axios.get(`/users/getAll?page=${page}&size=${rowsPerPage}`);

            const users: User[] = [];
            (response.data.data as UserDto[]).map(user => {
                users.push(userAdapter(user)!);
            })

            return {
                data: users,
                page: response.data.page,
                size: response.data.size,
                total: response.data.total
            };
        }
        catch (error) {
            throw error;
        }
    }

    public getUserWithSkills = async (userId: number): Promise<User | null> => {
        try {
            const response = await axios.get('/users/getUserWithSkills/' + userId);
            const userModel: User | null = userAdapter(response.data as UserDto);

            return userModel;
        }
        catch (error) {
            throw error;
        }
    };

    public createUser = async (user: createUserDto): Promise<User | null> => {
        try {
            const response = await axios.post('/auth/register', user);

            return userAdapter(response.data as UserDto);
        }
        catch (error) {
            throw error;
        }
    }

    public deleteUser = async (userId: number): Promise<boolean> => {
        try {
            const response = await axios.delete('/users/deleteById/' + userId);

            return response.data;
        }
        catch (error) {
            throw error;
        }
    }

    public addUserSkill = async (userId: number, skillId: number, level: number, learningDate: Date) => {
        try {
            const userSkill: CreateUserSkillDto = {
                userId: userId,
                skillId: skillId,
                skillLevel: level,
                learningDate: learningDate
            };
            const response = await axios.put<boolean>('/users/addSkillUser', userSkill);

            return response.data;
        }
        catch (error) {
            throw error;
        }
    }
};
