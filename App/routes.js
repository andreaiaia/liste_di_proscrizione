"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
var routes = function (fastify, options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // Testing route
        fastify.get('/test', function (req, reply) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                reply.code(200).send({ hello: 'friends' });
                return [2 /*return*/];
            });
        }); });
        fastify.get('/blacklist', function (req, reply) { return __awaiter(void 0, void 0, void 0, function () {
            var client, rows, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fastify.pg.connect()];
                    case 1:
                        client = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, 5, 6]);
                        return [4 /*yield*/, client.query("SELECT * FROM blacklisted")];
                    case 3:
                        rows = (_a.sent()).rows;
                        reply.code(200).send(rows);
                        return [3 /*break*/, 6];
                    case 4:
                        err_1 = _a.sent();
                        throw err_1;
                    case 5:
                        client.release();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        }); });
        fastify.get('/find', function (req, reply) { return __awaiter(void 0, void 0, void 0, function () {
            var client, email, rows, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fastify.pg.connect()];
                    case 1:
                        client = _a.sent();
                        email = req.query.email;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, 5, 6]);
                        return [4 /*yield*/, client.query('SELECT * FROM blacklisted WHERE email=$1', [email])];
                    case 3:
                        rows = (_a.sent()).rows;
                        if (rows === [])
                            reply.send("No match found");
                        reply.code(200).send(rows);
                        return [3 /*break*/, 6];
                    case 4:
                        err_2 = _a.sent();
                        throw err_2;
                    case 5:
                        client.release();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        }); });
        fastify.post('/blacklist', function (req, reply) { return __awaiter(void 0, void 0, void 0, function () {
            var _a, first_name, last_name, email, phone, is_blocked, last_edited_by;
            return __generator(this, function (_b) {
                _a = req.body, first_name = _a.first_name, last_name = _a.last_name, email = _a.email, phone = _a.phone, is_blocked = _a.is_blocked, last_edited_by = _a.last_edited_by;
                try {
                    return [2 /*return*/, fastify.pg.transact(function (client) { return __awaiter(void 0, void 0, void 0, function () {
                            var rows;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, client.query("INSERT INTO blacklisted \n                    (\n                        first_name, \n                        last_name, \n                        email, \n                        phone, \n                        is_blocked, \n                        last_edited_by\n                    )\n                    VALUES($1, $2, $3, $4, $5, $6 ) RETURNING *", [first_name, last_name, email, phone, is_blocked, last_edited_by])];
                                    case 1:
                                        rows = (_a.sent()).rows;
                                        reply.code(201).send(rows);
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                }
                catch (err) {
                    throw err;
                }
                return [2 /*return*/];
            });
        }); });
        fastify.patch('/', function (req, reply) { return __awaiter(void 0, void 0, void 0, function () {
            var _a, is_blocked, last_edited_by, id;
            return __generator(this, function (_b) {
                _a = req.body, is_blocked = _a.is_blocked, last_edited_by = _a.last_edited_by;
                id = req.query.id;
                try {
                    return [2 /*return*/, fastify.pg.transact(function (client) { return __awaiter(void 0, void 0, void 0, function () {
                            var rows;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, client.query("UPDATE blacklisted SET\n                        is_blocked=$5, \n                        last_edited_by=$6\n                    WHERE id=$7 RETURNING *", [is_blocked, last_edited_by, id])];
                                    case 1:
                                        rows = (_a.sent()).rows;
                                        reply.code(200).send(rows);
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                }
                catch (err) {
                    throw err;
                }
                return [2 /*return*/];
            });
        }); });
        fastify.delete('/', function (req, reply) { return __awaiter(void 0, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                id = req.query.id;
                try {
                    return [2 /*return*/, fastify.pg.transact(function (client) { return __awaiter(void 0, void 0, void 0, function () {
                            var rows;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, client.query("DELETE FROM blacklisted\n                    WHERE id=$1 RETURNING *", [id])];
                                    case 1:
                                        rows = (_a.sent()).rows;
                                        reply.code(200).send(rows);
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                }
                catch (err) {
                    throw err;
                }
                return [2 /*return*/];
            });
        }); });
        return [2 /*return*/];
    });
}); };
exports.routes = routes;
