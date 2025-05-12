import { IncomingMessage, ServerResponse } from 'http';
import {
  getUsersController,
  getUserByIdController,
  addUserController,
  updateUserController,
  deleteUserController,
} from '../controllers/UserController';
import { validate as isValidUUID } from 'uuid';
import { getRequestBody } from '../utils/RequestBody';
import { setResponse, responseErrors } from '../utils/Response';
import { getUserId } from '../utils/FormatString';
import { User } from '../models/User';

const USER_ENDPOINT = '/api/users';

export const userRouter = async (
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> => {
  const { url, method } = req;

  try {
    if (!url || !method) {
      return setResponse(res, responseErrors.MNA());
    }

    if (!url.startsWith(USER_ENDPOINT)) {
      return setResponse(res, responseErrors.ENF());
    }

    const userId = getUserId(url);
    if (userId && !isValidUUID(userId!)) {
      return setResponse(res, responseErrors.BAD_ID());
    }

    const body = ['POST', 'PUT'].includes(method)
      ? await getRequestBody(req)
      : undefined;

    switch (method) {
      case 'GET':
        if (userId) {
          setResponse(res, getUserByIdController(userId));
        } else {
          setResponse(res, getUsersController());
        }
        break;
      case 'POST':
        setResponse(res, addUserController(body as Omit<User, 'id'>));
        break;
      case 'PUT':
        setResponse(res, updateUserController(userId!, body! as User));
        break;
      case 'DELETE':
        setResponse(res, deleteUserController(userId!));
        break;
      default:
        setResponse(res, responseErrors.MNA());
    }
  } catch {
    setResponse(res, responseErrors.ISE());
  }
};
