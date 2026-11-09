/**
 * BÙI THANH VƯƠNG — PORTFOLIO DATA & SYSTEM ARCHITECTURE BLUEPRINTS
 * Contains structured profile metadata, skills matrix, career timeline,
 * and deep-dive architectural telemetry for each project.
 */

window.PORTFOLIO_DATA = {
  profile: {
    name: "Bùi Thanh Vương",
    role: "Backend Developer",
    specialization: "PHP / Laravel & Java / Spring Boot",
    tagline: "Kiến tạo nền tảng dữ liệu chuẩn xác, tối ưu hiệu năng truy vấn & kiến trúc hệ thống doanh nghiệp bền vững.",
    summary:
      "Chuyên gia phát triển Backend với kinh nghiệm thực chiến trong việc thiết kế và vận hành các hệ thống cốt lõi doanh nghiệp như PLM (Product Lifecycle Management) và SCM (Supply Chain Management — WMS/TMS). Thế mạnh nổi bật ở tư duy thiết kế cơ sở dữ liệu quan hệ chuẩn hóa, tối ưu truy vấn SQL phức tạp (giảm 30% độ trễ), xây dựng RESTful & GraphQL API hiệu năng cao cùng việc áp dụng triệt để kiến trúc Service-Repository Pattern.",
    phone: "034 6638 136",
    phoneRaw: "0346638136",
    email: "bthvuong23@gmail.com",
    location: "TP. Hồ Chí Minh, Việt Nam",
    coordinates: "10.7769° N, 106.7009° E",
    status: "Sẵn sàng cho các cơ hội Backend / System Engineering",
    metrics: [
      {
        value: "30",
        suffix: "%",
        prefix: "-",
        label: "Thời gian thực thi SQL",
        detail: "Tối ưu hóa truy vấn & Indexing trên PostgreSQL (PLM System)"
      },
      {
        value: "2",
        suffix: "+",
        prefix: "",
        label: "Hệ sinh thái Backend lõi",
        detail: "PHP 8+ / Laravel & Java / Spring Boot Enterprise"
      },
      {
        value: "3",
        suffix: "",
        prefix: "0",
        label: "Hệ thống trọng điểm",
        detail: "PLM Enterprise, SCM (WMS/TMS) & Real-time Survey Engine"
      },
      {
        value: "100",
        suffix: "%",
        prefix: "",
        label: "Service-Repository",
        detail: "Tách biệt rạch ròi Business Logic & Data Persistence"
      }
    ]
  },

  skillPillars: [
    {
      id: "01",
      category: "Programming & Backend Core",
      subtitle: "Ngôn ngữ lập trình, Framework doanh nghiệp & Giao thức API",
      accent: "#C9A96E",
      description:
        "Làm chủ hai hệ sinh thái Backend mạnh mẽ nhất hiện nay: sự linh hoạt tốc độ cao của PHP 8+/Laravel và tính chặt chẽ, chịu tải đồng thời cao của Java/Spring Boot.",
      skills: [
        { name: "PHP 8+", level: "Core Mastery", tag: "Language" },
        { name: "Java", level: "Core Mastery", tag: "Language" },
        { name: "SQL", level: "Advanced Optimization", tag: "Query" },
        { name: "Laravel", level: "Enterprise Architecture", tag: "Framework" },
        { name: "Spring Boot", level: "Enterprise Micro/Monolith", tag: "Framework" },
        { name: "Eloquent ORM", level: "Query Builder & Relations", tag: "ORM" },
        { name: "Spring Data JPA", level: "Hibernate & Transactions", tag: "ORM" },
        { name: "RESTful API", level: "Standardized Contracts", tag: "Protocol" },
        { name: "GraphQL", level: "Schema, Queries & Mutations", tag: "Protocol" }
      ]
    },
    {
      id: "02",
      category: "Database & System Architecture",
      subtitle: "Thiết kế lược đồ quan hệ, đánh chỉ mục & Kiến trúc phần mềm",
      accent: "#64A687",
      description:
        "Thiết kế cấu trúc bảng có tính mở rộng cao, kiểm soát đa phiên bản (Versioning) và đảm bảo tính toàn vẹn ACID trong các nghiệp vụ tồn kho/vòng đời sản phẩm.",
      skills: [
        { name: "PostgreSQL", level: "Relational & Indexing", tag: "RDBMS" },
        { name: "MySQL", level: "High-Throughput RDBMS", tag: "RDBMS" },
        { name: "Database Schema Design", level: "3NF & Domain Modeling", tag: "Design" },
        { name: "SQL Indexing & Tuning", level: "-30% Query Latency", tag: "Performance" },
        { name: "Service-Repository Pattern", level: "Clean Decoupling", tag: "Architecture" },
        { name: "Complex Business Logic", level: "Domain-Driven Rules", tag: "Core" },
        { name: "Data Versioning", level: "Draft / Published / Archived", tag: "Lifecycle" }
      ]
    },
    {
      id: "03",
      category: "DevOps, Tools & Security Layer",
      subtitle: "Đóng gói môi trường, quản lý mã nguồn & Bảo mật tầng Request",
      accent: "#7CA3C7",
      description:
        "Chuẩn hóa môi trường phát triển và triển khai bằng Docker container, kiểm soát luồng dữ liệu đầu vào nghiêm ngặt qua Middleware và FormRequest.",
      skills: [
        { name: "Docker", level: "Containerization", tag: "DevOps" },
        { name: "Docker Compose", level: "Multi-Container Stack", tag: "DevOps" },
        { name: "Git & Gitflow", level: "Branching & Code Review", tag: "VCS" },
        { name: "FormRequest Validation", level: "Strict Input Sanitization", tag: "Security" },
        { name: "Custom Middleware", level: "Auth & Access Guard", tag: "Security" },
        { name: "Postman", level: "API Testing & Collections", tag: "Tooling" },
        { name: "Nginx", level: "Reverse Proxy & Web Server", tag: "Infra" }
      ]
    },
    {
      id: "04",
      category: "Frontend Integration (Supporting)",
      subtitle: "Tương tác giao diện hiện đại, đồng bộ trạng thái & UI phản hồi nhanh",
      accent: "#D4846A",
      description:
        "Năng lực phối hợp mượt mà với Frontend, trực tiếp xây dựng giao diện React Hooks kết nối GraphQL/REST API với Optimistic UI và đồng bộ đa tab.",
      skills: [
        { name: "React Hooks", level: "State & Lifecycle", tag: "UI" },
        { name: "Axios / GraphQL Client", level: "Async Data Layer", tag: "Network" },
        { name: "Tailwind CSS", level: "Utility-First Styling", tag: "Design" },
        { name: "Optimistic UI Updates", level: "Zero-Latency UX", tag: "Pattern" },
        { name: "Cross-Tab Real-time Sync", level: "State Consistency", tag: "Pattern" }
      ]
    }
  ],

  experience: [
    {
      company: "TCOM",
      period: "02/2025 — 08/2025",
      location: "TP. Hồ Chí Minh",
      progression: [
        {
          role: "Backend Developer",
          stage: "Official Promotion",
          badge: "Chính thức"
        },
        {
          role: "Backend Developer Intern",
          stage: "Foundation & Rapid Growth",
          badge: "Khởi đầu"
        }
      ],
      summary:
        "Ghi dấu ấn với lộ trình thăng tiến trực tiếp từ Backend Developer Intern lên Backend Developer chính thức nhờ khả năng nắm bắt nhanh kiến trúc hệ thống phức tạp, trực tiếp tham gia thiết kế Database và phát triển hai hệ thống doanh nghiệp trọng điểm: PLM (PHP/Laravel) và SCM - WMS/TMS (Java/Spring Boot).",
      highlights: [
        "Thiết kế lược đồ cơ sở dữ liệu PostgreSQL chuẩn hóa cho các thực thể cốt lõi của hệ thống PLM: Parts, Revisions, Versions và Groups.",
        "Phân tích Execution Plan, thiết lập Composite Indexing và tái cấu trúc truy vấn Eloquent/SQL giúp giảm 30% thời gian phản hồi trên tập dữ liệu lớn.",
        "Xây dựng máy trạng thái quản lý vòng đời phiên bản (Draft → Published → Archived) đảm bảo tính bất biến của dữ liệu lịch sử.",
        "Triển khai GraphQL API theo chuẩn Service-Repository Pattern, bảo vệ hệ thống bằng lớp FormRequest và Custom Middleware trong môi trường Docker.",
        "Chuyển giao linh hoạt sang hệ sinh thái Java/Spring Boot để phát triển phân hệ WMS (quản lý Available/Reserved Quantity với @Transactional & @Scheduled) và TMS (quản lý đội phương tiện & tài xế)."
      ]
    }
  ],

  projects: [
    {
      id: "plm-system",
      index: "01",
      codeName: "SYS-PLM // ENTERPRISE",
      category: "plm",
      organization: "TCOM Enterprise Project",
      period: "2025",
      title: "Hệ thống Quản lý Vòng đời Sản phẩm (PLM)",
      subtitle: "Product Lifecycle Management — High-Performance GraphQL & PostgreSQL Engine",
      stackPrimary: "PHP 8+ / Laravel / PostgreSQL / GraphQL",
      impactBadge: "-30% SQL Query Time",
      summary:
        "Nền tảng Backend cốt lõi quản lý cấu trúc linh kiện (Parts), lịch sử sửa đổi (Revisions), kiểm soát phiên bản (Versions) và phân nhóm (Groups) với luồng phê duyệt chặt chẽ và hiệu năng truy vấn được tối ưu hóa sâu.",
      keyAchievements: [
        "Thiết kế PostgreSQL Schema cho đa tầng thực thể: Parts, Revisions, Versions, Groups đảm bảo toàn vẹn khóa ngoại và truy xuất phân cấp nhanh.",
        "Tối ưu hóa truy vấn SQL (Indexing chiến lược, loại bỏ N+1 Query trên GraphQL) giúp giảm 30% thời gian thực thi.",
        "Xây dựng luồng quản lý trạng thái phiên bản chặt chẽ: Draft (Nháp) → Published (Phát hành) → Archived (Lưu trữ).",
        "Kiến trúc GraphQL API áp dụng Service-Repository Pattern giúp tách biệt hoàn toàn nghiệp vụ và truy xuất dữ liệu.",
        "Bảo mật tầng biên với Laravel FormRequest Validation, Custom Middleware và đóng gói đồng nhất qua Docker."
      ],
      technologies: [
        "PHP 8+",
        "Laravel",
        "PostgreSQL",
        "GraphQL",
        "Eloquent ORM",
        "Service-Repository",
        "FormRequest",
        "Custom Middleware",
        "Docker"
      ],
      blueprint: {
        architectureLayers: [
          "Client / GraphQL Query & Mutation",
          "Custom Middleware & FormRequest Security Guard",
          "GraphQL Resolver Layer",
          "Domain Service Layer (Versioning State Machine: Draft → Published → Archived)",
          "Repository Interface & Eloquent Implementation",
          "PostgreSQL (Composite Indexes on Parts / Revisions / Versions / Groups)"
        ],
        schemaEntities: [
          {
            table: "groups",
            fields: "id (PK), code (UNIQUE), parent_id (FK), metadata_json, created_at"
          },
          {
            table: "parts",
            fields: "id (PK), group_id (FK), part_number (INDEX), name, current_revision_id"
          },
          {
            table: "revisions",
            fields: "id (PK), part_id (FK), rev_code, active_version_id, created_by"
          },
          {
            table: "versions",
            fields: "id (PK), revision_id (FK), version_no, status (ENUM: draft|published|archived), published_at"
          }
        ],
        benchmark: {
          metricName: "Thời gian phản hồi truy vấn cây linh kiện & lịch sử phiên bản (PostgreSQL)",
          beforeLabel: "Trước tối ưu (Joins lồng nhau & N+1 Resolver)",
          beforeValue: "420 ms",
          beforePercent: 100,
          afterLabel: "Sau tối ưu (Composite Index + Eager Batching)",
          afterValue: "294 ms (-30%)",
          afterPercent: 70
        },
        codeTitle: "PartVersionService.php — Quản lý chuyển đổi trạng thái Version & Tối ưu Repository",
        codeSnippet: `<?php

namespace App\\Services\\PLM;

use App\\Repositories\\Contracts\\PartVersionRepositoryInterface;
use App\\Enums\\VersionStatus;
use Illuminate\\Support\\Facades\\DB;
use DomainException;

class PartVersionService
{
    public function __construct(
        private readonly PartVersionRepositoryInterface $versionRepo
    ) {}

    /**
     * Chuyển trạng thái Version từ Draft -> Published
     * và tự động Archive phiên bản Published trước đó trong cùng Revision.
     */
    public function publishVersion(int $versionId, int $actorId): array
    {
        return DB::transaction(function () use ($versionId, $actorId) {
            $version = $this->versionRepo->findWithRevisionLock($versionId);

            if ($version->status !== VersionStatus::DRAFT) {
                throw new DomainException('Chỉ phiên bản ở trạng thái DRAFT mới được phép Publish.');
            }

            // Lưu trữ (Archive) phiên bản đang Published hiện hành
            $this->versionRepo->archiveCurrentPublished($version->revision_id);

            // Nâng cấp phiên bản hiện tại lên Published
            $published = $this->versionRepo->updateStatus(
                id: $version->id,
                status: VersionStatus::PUBLISHED,
                actorId: $actorId
            );

            return $this->versionRepo->getOptimizedPartTree($published->revision->part_id);
        });
    }
}`
      }
    },
    {
      id: "scm-system",
      index: "02",
      codeName: "SYS-SCM // WMS & TMS",
      category: "scm",
      organization: "TCOM Enterprise Project",
      period: "2025",
      title: "Hệ thống Quản lý Chuỗi Cung ứng (SCM: WMS & TMS)",
      subtitle: "Warehouse & Transport Management System — Java & Spring Boot Enterprise",
      stackPrimary: "Java / Spring Boot / Spring Data JPA / SQL",
      impactBadge: "ACID Inventory & Fleet Engine",
      summary:
        "Hệ thống điều phối chuỗi cung ứng tích hợp hai phân hệ trọng yếu: Quản lý kho hàng (WMS) kiểm soát tồn kho khả dụng/đặt giữ theo thời gian thực và Quản lý vận tải (TMS) điều phối phương tiện cùng đội ngũ tài xế.",
      keyAchievements: [
        "Phát triển phân hệ WMS (Warehouse Management System): Quản lý chặt chẽ kho bãi và định lượng tồn kho kép (Available Quantity & Reserved Quantity).",
        "Đảm bảo tính toàn vẹn dữ liệu tuyệt đối khi xuất/nhập/giữ hàng đồng thời bằng cơ chế quản lý giao dịch @Transactional của Spring.",
        "Tự động hóa các tác vụ định kỳ (giải phóng hàng giữ quá hạn, đồng bộ đối soát tồn kho) sử dụng @Scheduled.",
        "Phát triển phân hệ TMS (Transport Management System): Quản lý vòng đời phương tiện vận tải, trạng thái hoạt động và phân công tài xế.",
        "Thiết kế RESTful API chuẩn mực với Spring Boot và Spring Data JPA, tách biệt rõ tầng Service xử lý nghiệp vụ chuỗi cung ứng."
      ],
      technologies: [
        "Java",
        "Spring Boot",
        "Spring Data JPA",
        "@Transactional",
        "@Scheduled",
        "RESTful API",
        "Relational DB",
        "WMS / TMS Domain"
      ],
      blueprint: {
        architectureLayers: [
          "RESTful API Controllers (WMS Inventory & TMS Fleet Endpoints)",
          "Spring Service Layer (@Transactional Concurrency & Stock Allocation)",
          "Background Scheduler Engine (@Scheduled Stock Reservation Reconciler)",
          "Spring Data JPA Repositories (Pessimistic/Optimistic Locking)",
          "Relational Database (Warehouses, StockLedgers, Vehicles, Drivers)"
        ],
        schemaEntities: [
          {
            table: "warehouse_stocks",
            fields: "id (PK), warehouse_id, sku_code, available_qty, reserved_qty, version"
          },
          {
            table: "stock_reservations",
            fields: "id (PK), order_ref, stock_id (FK), qty, status, expires_at"
          },
          {
            table: "tms_vehicles",
            fields: "id (PK), license_plate (UNIQUE), capacity_kg, status, current_driver_id (FK)"
          },
          {
            table: "tms_drivers",
            fields: "id (PK), full_name, license_class, phone, availability_status"
          }
        ],
        benchmark: {
          metricName: "Độ chính xác đối soát tồn kho (Available vs Reserved) dưới tải đồng thời",
          beforeLabel: "Xử lý tuần tự không khóa giao dịch (Nguy cơ Race Condition)",
          beforeValue: "Rủi ro lệch tồn kho",
          beforePercent: 62,
          afterLabel: "Cơ chế @Transactional + Tự động thu hồi @Scheduled",
          afterValue: "100% Toàn vẹn ACID",
          afterPercent: 100
        },
        codeTitle: "WarehouseInventoryService.java — Cấp phát tồn kho @Transactional & @Scheduled",
        codeSnippet: `package com.tcom.scm.wms.service;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WarehouseInventoryService {

    private final WarehouseStockRepository stockRepository;
    private final StockReservationRepository reservationRepository;

    /**
     * Khấu trừ Available Quantity và tăng Reserved Quantity trong một giao dịch nguyên tử.
     */
    @Transactional(rollbackFor = Exception.class)
    public ReservationDto reserveInventory(String sku, Long warehouseId, int requestedQty) {
        WarehouseStock stock = stockRepository
            .findByWarehouseAndSkuForUpdate(warehouseId, sku)
            .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy tồn kho SKU: " + sku));

        if (stock.getAvailableQuantity() < requestedQty) {
            throw new InsufficientStockException("Số lượng khả dụng không đủ để đặt giữ.");
        }

        stock.setAvailableQuantity(stock.getAvailableQuantity() - requestedQty);
        stock.setReservedQuantity(stock.getReservedQuantity() + requestedQty);
        stockRepository.save(stock);

        return reservationRepository.createReservation(stock, requestedQty);
    }

    /**
     * Định kỳ mỗi 5 phút giải phóng các lệnh giữ hàng (Reserved) đã hết hạn về lại Available.
     */
    @Scheduled(fixedRate = 300_000)
    @Transactional
    public void releaseExpiredReservations() {
        var expiredList = reservationRepository.findAllExpiredActiveReservations();
        expiredList.forEach(this::restoreReservedToAvailable);
    }
}`
      }
    },
    {
      id: "survey-system",
      index: "03",
      codeName: "SYS-SURVEY // REAL-TIME",
      category: "fullstack",
      organization: "Personal Flagship Project",
      period: "2025",
      title: "Hệ thống Khảo sát & Đánh giá Tương tác",
      subtitle: "Interactive Survey & Evaluation Platform — GraphQL, Optimistic UI & Cross-Tab Sync",
      stackPrimary: "Laravel / GraphQL / MySQL / React / Docker",
      impactBadge: "Real-Time Multi-Tab Sync",
      summary:
        "Nền tảng khảo sát và đánh giá tương tác hiện đại kết hợp sức mạnh của Laravel GraphQL Backend với trải nghiệm React Frontend tức thời, hỗ trợ Optimistic Updates và đồng bộ dữ liệu thời gian thực giữa nhiều tab trình duyệt.",
      keyAchievements: [
        "Xây dựng đầy đủ nghiệp vụ CRUD động cho hệ thống Câu hỏi (Questions) và Lựa chọn trả lời (Options) thông qua GraphQL Schema chặt chẽ.",
        "Triển khai kỹ thuật Optimistic Updates ở phía Client kết hợp GraphQL Mutations, mang lại cảm giác phản hồi tức thì (0ms perceived latency) khi người dùng thao tác.",
        "Thiết kế cơ chế đồng bộ hóa dữ liệu Real-time giữa các Tab trình duyệt (Cross-tab synchronization), đảm bảo mọi thay đổi câu hỏi/đáp án hiển thị ngay lập tức mà không cần tải lại trang.",
        "Đóng gói toàn bộ kiến trúc (Laravel, MySQL, React, Nginx Reverse Proxy) bằng Docker và Docker Compose sẵn sàng triển khai."
      ],
      technologies: [
        "Laravel",
        "GraphQL",
        "MySQL",
        "React Hooks",
        "Tailwind CSS",
        "Optimistic UI",
        "Docker",
        "Nginx"
      ],
      blueprint: {
        architectureLayers: [
          "React Hooks UI + Tailwind CSS (Optimistic State & Cross-Tab Broadcast)",
          "Nginx Reverse Proxy & Static Asset Gateway (Docker Container)",
          "Laravel GraphQL Server (Queries & Mutations for Questions/Options)",
          "Service-Repository Business Layer (Validation & Ordering)",
          "MySQL Relational Storage (Surveys, Questions, QuestionOptions, Responses)"
        ],
        schemaEntities: [
          {
            table: "surveys",
            fields: "id (PK), title, slug (INDEX), is_active, version_hash, updated_at"
          },
          {
            table: "survey_questions",
            fields: "id (PK), survey_id (FK), content, question_type, sort_order"
          },
          {
            table: "question_options",
            fields: "id (PK), question_id (FK), label, score_weight, vote_count"
          }
        ],
        benchmark: {
          metricName: "Độ trễ phản hồi giao diện khi thêm/sửa Option & Đồng bộ đa Tab",
          beforeLabel: "Truyền thống (Chờ vòng lặp Request-Response & Reload)",
          beforeValue: "~320 ms + F5",
          beforePercent: 85,
          afterLabel: "Optimistic GraphQL Mutation + Cross-Tab Event Bus",
          afterValue: "< 16 ms (Tức thì)",
          afterPercent: 12
        },
        codeTitle: "useOptimisticSurveySync.js — Optimistic GraphQL Mutation & Đồng bộ Real-time giữa các Tab",
        codeSnippet: `// Cơ chế Optimistic UI kết hợp BroadcastChannel đồng bộ tức thì giữa các Tab
const surveyChannel = new BroadcastChannel('btv_survey_realtime_sync');

export function useSurveyMutation( executeMutation, setQuestions ) {
  const updateOptionOptimistically = async (questionId, optionId, newLabel) => {
    // 1. Snapshot trạng thái cũ để rollback nếu có lỗi mạng
    let previousStateSnapshot = null;

    // 2. Optimistic Update ngay lập tức trên UI (< 16ms frame)
    setQuestions((current) => {
      previousStateSnapshot = structuredClone(current);
      return current.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((opt) =>
                opt.id === optionId ? { ...opt, label: newLabel, syncing: true } : opt
              ),
            }
          : q
      );
    });

    // 3. Phát tín hiệu đồng bộ Real-time sang toàn bộ các Tab đang mở
    surveyChannel.postMessage({
      type: 'OPTION_UPDATED',
      payload: { questionId, optionId, newLabel, timestamp: Date.now() },
    });

    try {
      await executeMutation({ variables: { questionId, optionId, label: newLabel } });
    } catch (error) {
      // Rollback an toàn nếu GraphQL Mutation thất bại
      if (previousStateSnapshot) setQuestions(previousStateSnapshot);
    }
  };

  return { updateOptionOptimistically };
}`
      }
    }
  ]
};
