const { register, login } = require("../authController");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");

jest.mock("../../models/User");
jest.mock("jsonwebtoken");

describe("Auth Controller", () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe("register", () => {
    it("should register a new user and return token", async () => {
      mockReq = {
        body: {
          name: "Test User",
          email: "test@example.com",
          password: "password123",
          role: "patient",
        },
      };

      User.findOne.mockResolvedValue(null);
      const saveMock = jest.fn().mockResolvedValue();

      User.mockImplementation(() => ({
        save: saveMock,
        _id: "user123",
        name: "Test User",
        email: "test@example.com",
        role: "patient",
      }));

      jwt.sign.mockReturnValue("mocked_token");

      await register(mockReq, mockRes);

      expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
      expect(saveMock).toHaveBeenCalled();
      expect(jwt.sign).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "User registered successfully",
          user: expect.any(Object),
          token: "mocked_token",
        })
      );
    });

    it("should not register if email already exists", async () => {
      mockReq = {
        body: {
          name: "Test User",
          email: "test@example.com",
          password: "password123",
          role: "patient",
        },
      };

      User.findOne.mockResolvedValue({ _id: "existingUser" });

      await register(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Email already in use",
      });
    });
  });

  describe("login", () => {
    it("should login a valid user and return token", async () => {
      mockReq = {
        body: {
          email: "jane@test.com",
          password: "password123",
        },
      };

      const mockUser = {
        _id: "user123",
        name: "Jane",
        email: "jane@test.com",
        role: "provider",
        comparePassword: jest.fn().mockResolvedValue(true),
      };

      User.findOne.mockResolvedValue(mockUser);
      jwt.sign.mockReturnValue("mocked_login_token");

      await login(mockReq, mockRes);

      expect(mockUser.comparePassword).toHaveBeenCalledWith("password123");
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Login successful",
          user: expect.any(Object),
          token: "mocked_login_token",
        })
      );
    });

    it("should return 404 if user not found", async () => {
      mockReq = {
        body: {
          email: "unknown@test.com",
          password: "password123",
        },
      };

      User.findOne.mockResolvedValue(null);

      await login(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "User not found",
      });
    });

    it("should return 401 for incorrect password", async () => {
      mockReq = {
        body: {
          email: "wrong@test.com",
          password: "wrongpass",
        },
      };

      const mockUser = {
        comparePassword: jest.fn().mockResolvedValue(false),
      };

      User.findOne.mockResolvedValue(mockUser);

      await login(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Invalid credentials",
      });
    });
  });
});
