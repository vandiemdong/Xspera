USE [Xspera]
GO
/****** Object:  Table [dbo].[Brands]    Script Date: 9/8/2019 8:12:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Brands](
	[ID] [bigint] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NULL,
	[Description] [nvarchar](500) NULL,
 CONSTRAINT [PK_Brands] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Products]    Script Date: 9/8/2019 8:12:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Products](
	[ID] [bigint] IDENTITY(1,1) NOT NULL,
	[BrandID] [bigint] NULL,
	[Name] [nvarchar](250) NULL,
	[Description] [nvarchar](500) NULL,
	[Price] [decimal](18, 2) NULL,
	[Color] [int] NULL,
	[CreatedDate] [datetime] NULL,
	[Image] [nvarchar](1000) NULL,
 CONSTRAINT [PK_Products] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Reviews]    Script Date: 9/8/2019 8:12:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Reviews](
	[ID] [bigint] IDENTITY(1,1) NOT NULL,
	[Rating] [int] NULL,
	[Comment] [nvarchar](max) NULL,
	[CreatedDate] [datetime] NULL,
	[ProductID] [bigint] NULL,
	[UserID] [bigint] NULL,
 CONSTRAINT [PK_Reviews] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 9/8/2019 8:12:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[ID] [bigint] IDENTITY(1,1) NOT NULL,
	[Type] [int] NULL,
	[Username] [nvarchar](250) NULL,
	[Email] [nvarchar](250) NULL,
	[DOB] [datetime] NULL,
	[CreatedDate] [datetime] NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Brands] ON 

INSERT [dbo].[Brands] ([ID], [Name], [Description]) VALUES (1, N'Apple', NULL)
INSERT [dbo].[Brands] ([ID], [Name], [Description]) VALUES (2, N'Samsung', NULL)
INSERT [dbo].[Brands] ([ID], [Name], [Description]) VALUES (3, N'Huawei', NULL)
INSERT [dbo].[Brands] ([ID], [Name], [Description]) VALUES (4, N'Nokia', NULL)
INSERT [dbo].[Brands] ([ID], [Name], [Description]) VALUES (5, N'Realme', NULL)
INSERT [dbo].[Brands] ([ID], [Name], [Description]) VALUES (6, N'Xiaomi', NULL)
INSERT [dbo].[Brands] ([ID], [Name], [Description]) VALUES (7, N'Oppo', NULL)
INSERT [dbo].[Brands] ([ID], [Name], [Description]) VALUES (8, N'Vivo', NULL)
INSERT [dbo].[Brands] ([ID], [Name], [Description]) VALUES (9, N'Wiko', NULL)
INSERT [dbo].[Brands] ([ID], [Name], [Description]) VALUES (10, N'Lenovo', NULL)
SET IDENTITY_INSERT [dbo].[Brands] OFF
SET IDENTITY_INSERT [dbo].[Products] ON 

INSERT [dbo].[Products] ([ID], [BrandID], [Name], [Description], [Price], [Color], [CreatedDate], [Image]) VALUES (1, 1, N'iPhone XS Max 256 GB', N'The longest battery life ever in an iPhone.', CAST(1000.00 AS Decimal(18, 2)), 2, CAST(N'2019-09-03T00:00:00.000' AS DateTime), N'https://www.mockupworld.co/wp-content/uploads/edd/2019/09/free-iphone-x-showcase-mockup-psd-1000x744.jpg')
INSERT [dbo].[Products] ([ID], [BrandID], [Name], [Description], [Price], [Color], [CreatedDate], [Image]) VALUES (2, 1, N'iPhone X', N'The longest battery life ever in an iPhone.', CAST(900.00 AS Decimal(18, 2)), 1, CAST(N'2019-08-08T00:00:00.000' AS DateTime), N'https://www.mockupworld.co/wp-content/uploads/edd/2019/08/free-mobile-design-iphone-showcase-mockup-psd-600x450.jpg')
INSERT [dbo].[Products] ([ID], [BrandID], [Name], [Description], [Price], [Color], [CreatedDate], [Image]) VALUES (3, 1, N'iPhone 8', N'The longest battery life ever in an iPhone.', CAST(800.00 AS Decimal(18, 2)), 1, CAST(N'2019-08-08T00:00:00.000' AS DateTime), N'https://www.mockupworld.co/wp-content/uploads/edd/2019/06/free-hand-holding-iphone-xs-mockup-psd-600x450.jpg')
INSERT [dbo].[Products] ([ID], [BrandID], [Name], [Description], [Price], [Color], [CreatedDate], [Image]) VALUES (4, 1, N'iPhone 7', N'The longest battery life ever in an iPhone.', CAST(760.00 AS Decimal(18, 2)), 1, CAST(N'2019-08-08T00:00:00.000' AS DateTime), N'https://www.mockupworld.co/wp-content/uploads/edd/2019/07/free-iphone-xs-clay-mockup-psd-600x450.jpg')
INSERT [dbo].[Products] ([ID], [BrandID], [Name], [Description], [Price], [Color], [CreatedDate], [Image]) VALUES (5, 1, N'iPhone 6', N'The longest battery life ever in an iPhone.', CAST(870.00 AS Decimal(18, 2)), 3, CAST(N'2019-08-08T00:00:00.000' AS DateTime), N'https://www.mockupworld.co/wp-content/uploads/edd/2019/07/free-iphone-xs-hand-mockup-psd-600x450.jpg')
INSERT [dbo].[Products] ([ID], [BrandID], [Name], [Description], [Price], [Color], [CreatedDate], [Image]) VALUES (6, 2, N'Samsung Galaxy Note', N'The longest battery life ever in an iPhone.', CAST(678.00 AS Decimal(18, 2)), 1, CAST(N'2019-08-08T00:00:00.000' AS DateTime), N'https://www.psdmockups.com/wp-content/uploads/2019/08/Samsung-Galaxy-Note-10-Android-Smartphone-Stylus-PSD-Mockup.jpg')
INSERT [dbo].[Products] ([ID], [BrandID], [Name], [Description], [Price], [Color], [CreatedDate], [Image]) VALUES (7, 2, N'Samsung A10', N'The longest battery life ever in an iPhone.', CAST(123.00 AS Decimal(18, 2)), 2, CAST(N'2019-08-08T00:00:00.000' AS DateTime), N'https://www.psdmockups.com/wp-content/uploads/2019/08/Mobile-Android-Samsung-Smartphone-PSD-Mockup.jpg')
INSERT [dbo].[Products] ([ID], [BrandID], [Name], [Description], [Price], [Color], [CreatedDate], [Image]) VALUES (8, 2, N'Samsung A9', N'The longest battery life ever in an iPhone.', CAST(456.00 AS Decimal(18, 2)), 1, CAST(N'2019-08-08T00:00:00.000' AS DateTime), N'https://www.psdmockups.com/wp-content/uploads/2017/09/Mobile-Samsung-Smartphone-S8-Front-Display-PSD-Mockup.jpg')
INSERT [dbo].[Products] ([ID], [BrandID], [Name], [Description], [Price], [Color], [CreatedDate], [Image]) VALUES (9, 2, N'Samsung A8', N'The longest battery life ever in an iPhone.', CAST(778.00 AS Decimal(18, 2)), 1, CAST(N'2019-08-08T00:00:00.000' AS DateTime), N'https://www.psdmockups.com/wp-content/uploads/2018/03/Galaxy-S9-Android-Smartphone-Screen-Back-PSD-Mockup.jpg')
INSERT [dbo].[Products] ([ID], [BrandID], [Name], [Description], [Price], [Color], [CreatedDate], [Image]) VALUES (10, 2, N'Samsung A7', N'The longest battery life ever in an iPhone.', CAST(566.00 AS Decimal(18, 2)), 1, CAST(N'2019-08-08T00:00:00.000' AS DateTime), N'https://www.psdmockups.com/wp-content/uploads/2017/10/Samsung-Galaxy-Note-8-Android-Smartphone-PSD-Mockup.jpg')
INSERT [dbo].[Products] ([ID], [BrandID], [Name], [Description], [Price], [Color], [CreatedDate], [Image]) VALUES (11, 3, N'Huawei P30 Pro', N'The longest battery life ever in an iPhone.', CAST(55.00 AS Decimal(18, 2)), 1, CAST(N'2019-08-08T00:00:00.000' AS DateTime), N'https://www.free-mockup.com/wp-content/uploads/edd/2019/09/Hand-Holding-Smartphone-Mockup-600x450.jpg')
INSERT [dbo].[Products] ([ID], [BrandID], [Name], [Description], [Price], [Color], [CreatedDate], [Image]) VALUES (12, 3, N'Huawei 1', N'The longest battery life ever in an iPhone.', CAST(343.00 AS Decimal(18, 2)), 1, CAST(N'2019-08-08T00:00:00.000' AS DateTime), N'https://www.free-mockup.com/wp-content/uploads/edd/2019/04/Free-Galaxy-S10-Plus-Mockup-600x450.jpg')
INSERT [dbo].[Products] ([ID], [BrandID], [Name], [Description], [Price], [Color], [CreatedDate], [Image]) VALUES (13, 3, N'Huawei 1', N'The longest battery life ever in an iPhone.', CAST(767.00 AS Decimal(18, 2)), 1, CAST(N'2019-08-08T00:00:00.000' AS DateTime), N'https://www.free-mockup.com/wp-content/uploads/edd/2019/03/Samsung-Galaxy-S10-Free-Mockup-600x450.jpg')
INSERT [dbo].[Products] ([ID], [BrandID], [Name], [Description], [Price], [Color], [CreatedDate], [Image]) VALUES (14, 3, N'Huawei 1', N'The longest battery life ever in an iPhone.', CAST(989.00 AS Decimal(18, 2)), 3, CAST(N'2019-08-08T00:00:00.000' AS DateTime), N'https://www.free-mockup.com/wp-content/uploads/edd/2019/03/Free-Samsung-Galaxy-S10-Plus-Mockup-01.jpg')
INSERT [dbo].[Products] ([ID], [BrandID], [Name], [Description], [Price], [Color], [CreatedDate], [Image]) VALUES (15, 3, N'Huawei 1', N'The longest battery life ever in an iPhone.', CAST(646.00 AS Decimal(18, 2)), 1, CAST(N'2019-08-08T00:00:00.000' AS DateTime), N'https://www.free-mockup.com/wp-content/uploads/edd/2018/09/Samsung-Note-9-Mockup-600x450.jpg')
INSERT [dbo].[Products] ([ID], [BrandID], [Name], [Description], [Price], [Color], [CreatedDate], [Image]) VALUES (16, 4, N'Nokia 6 Plus', N'The longest battery life ever in an iPhone.', CAST(535.00 AS Decimal(18, 2)), 1, CAST(N'2019-08-08T00:00:00.000' AS DateTime), N'https://cdn.tgdd.vn/Products/Images/42/161554/samsung-galaxy-s10-white-600x600.jpg')
INSERT [dbo].[Products] ([ID], [BrandID], [Name], [Description], [Price], [Color], [CreatedDate], [Image]) VALUES (17, 4, N'Nokia 1 Plus', N'The longest battery life ever in an iPhone.', CAST(657.00 AS Decimal(18, 2)), 1, CAST(N'2019-08-08T00:00:00.000' AS DateTime), N'https://cdn.tgdd.vn/Products/Images/42/161554/samsung-galaxy-s10-white-600x600.jpg')
INSERT [dbo].[Products] ([ID], [BrandID], [Name], [Description], [Price], [Color], [CreatedDate], [Image]) VALUES (18, 4, N'Nokia 2 Plus', N'The longest battery life ever in an iPhone.', CAST(87.00 AS Decimal(18, 2)), 7, CAST(N'2019-08-08T00:00:00.000' AS DateTime), N'https://cdn.tgdd.vn/Products/Images/42/161554/samsung-galaxy-s10-white-600x600.jpg')
INSERT [dbo].[Products] ([ID], [BrandID], [Name], [Description], [Price], [Color], [CreatedDate], [Image]) VALUES (19, 4, N'Nokia 3 Plus', N'The longest battery life ever in an iPhone.', CAST(65.00 AS Decimal(18, 2)), 4, CAST(N'2019-08-08T00:00:00.000' AS DateTime), N'https://cdn.tgdd.vn/Products/Images/42/161554/samsung-galaxy-s10-white-600x600.jpg')
INSERT [dbo].[Products] ([ID], [BrandID], [Name], [Description], [Price], [Color], [CreatedDate], [Image]) VALUES (20, 4, N'Nokia 4 Plus', N'The longest battery life ever in an iPhone.', CAST(5346.00 AS Decimal(18, 2)), 1, CAST(N'2019-08-08T00:00:00.000' AS DateTime), N'https://cdn.tgdd.vn/Products/Images/42/161554/samsung-galaxy-s10-white-600x600.jpg')
INSERT [dbo].[Products] ([ID], [BrandID], [Name], [Description], [Price], [Color], [CreatedDate], [Image]) VALUES (21, 5, N'Realme 3 Pro', N'The longest battery life ever in an iPhone.', CAST(787.00 AS Decimal(18, 2)), 1, CAST(N'2019-08-08T00:00:00.000' AS DateTime), N'https://cdn.tgdd.vn/Products/Images/42/161554/samsung-galaxy-s10-white-600x600.jpg')
INSERT [dbo].[Products] ([ID], [BrandID], [Name], [Description], [Price], [Color], [CreatedDate], [Image]) VALUES (22, 5, N'Realme 1', N'The longest battery life ever in an iPhone.', CAST(646.00 AS Decimal(18, 2)), 8, CAST(N'2019-08-08T00:00:00.000' AS DateTime), N'https://cdn.tgdd.vn/Products/Images/42/161554/samsung-galaxy-s10-white-600x600.jpgLL')
INSERT [dbo].[Products] ([ID], [BrandID], [Name], [Description], [Price], [Color], [CreatedDate], [Image]) VALUES (23, 5, N'Realme 2', N'The longest battery life ever in an iPhone.', CAST(64.00 AS Decimal(18, 2)), 1, CAST(N'2019-08-08T00:00:00.000' AS DateTime), N'https://cdn.tgdd.vn/Products/Images/42/161554/samsung-galaxy-s10-white-600x600.jpg')
INSERT [dbo].[Products] ([ID], [BrandID], [Name], [Description], [Price], [Color], [CreatedDate], [Image]) VALUES (24, 5, N'Realme 3', N'The longest battery life ever in an iPhone.', CAST(648.00 AS Decimal(18, 2)), 1, CAST(N'2019-08-08T00:00:00.000' AS DateTime), N'https://cdn.tgdd.vn/Products/Images/42/161554/samsung-galaxy-s10-white-600x600.jpg')
INSERT [dbo].[Products] ([ID], [BrandID], [Name], [Description], [Price], [Color], [CreatedDate], [Image]) VALUES (25, 5, N'Realme 4', N'The longest battery life ever in an iPhone.', CAST(789.00 AS Decimal(18, 2)), 6, CAST(N'2019-08-08T00:00:00.000' AS DateTime), N'https://cdn.tgdd.vn/Products/Images/42/161554/samsung-galaxy-s10-white-600x600.jpg')
INSERT [dbo].[Products] ([ID], [BrandID], [Name], [Description], [Price], [Color], [CreatedDate], [Image]) VALUES (26, 6, N'Xiaomi Mi 9', N'The longest battery life ever in an iPhone.', CAST(4667.00 AS Decimal(18, 2)), 1, CAST(N'2019-08-08T00:00:00.000' AS DateTime), N'https://cdn.tgdd.vn/Products/Images/42/161554/samsung-galaxy-s10-white-600x600.jpg')
INSERT [dbo].[Products] ([ID], [BrandID], [Name], [Description], [Price], [Color], [CreatedDate], [Image]) VALUES (27, 6, N'Xiaomi Mi 8', N'The longest battery life ever in an iPhone.', CAST(678.00 AS Decimal(18, 2)), 1, CAST(N'2019-08-08T00:00:00.000' AS DateTime), N'https://cdn.tgdd.vn/Products/Images/42/161554/samsung-galaxy-s10-white-600x600.jpg')
INSERT [dbo].[Products] ([ID], [BrandID], [Name], [Description], [Price], [Color], [CreatedDate], [Image]) VALUES (28, 6, N'Xiaomi Mi 10', N'The longest battery life ever in an iPhone.', CAST(123.00 AS Decimal(18, 2)), 1, CAST(N'2019-08-08T00:00:00.000' AS DateTime), N'https://www.free-mockup.com/wp-content/uploads/edd/2018/08/Samsung-Galaxy-Note-9-Free-Mockup-600x450.jpg')
SET IDENTITY_INSERT [dbo].[Products] OFF
SET IDENTITY_INSERT [dbo].[Reviews] ON 

INSERT [dbo].[Reviews] ([ID], [Rating], [Comment], [CreatedDate], [ProductID], [UserID]) VALUES (1, 3, N'Phasellus sed ultricies mi non congue ullam corper. Praesent tincidunt sedtellus ut rutrum. Sed vitae justo condimentum, porta lectus vitae, ultricies congue gravida diam non fringilla.', CAST(N'2019-09-03T22:45:56.950' AS DateTime), 1, 1)
INSERT [dbo].[Reviews] ([ID], [Rating], [Comment], [CreatedDate], [ProductID], [UserID]) VALUES (2, 7, N'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', CAST(N'2019-09-03T23:22:46.560' AS DateTime), 1, 2)
INSERT [dbo].[Reviews] ([ID], [Rating], [Comment], [CreatedDate], [ProductID], [UserID]) VALUES (15, 10, N'Discover the innovative world of Apple and shop everything iPhone, iPad, Apple Watch, Mac, and Apple TV, plus explore accessories, entertainment.', CAST(N'2019-09-08T17:49:52.730' AS DateTime), 1, 9)
SET IDENTITY_INSERT [dbo].[Reviews] OFF
SET IDENTITY_INSERT [dbo].[Users] ON 

INSERT [dbo].[Users] ([ID], [Type], [Username], [Email], [DOB], [CreatedDate]) VALUES (1, 1, N'vandiemdong', N'vandiemdong@gmail.com', CAST(N'1994-10-23T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Users] ([ID], [Type], [Username], [Email], [DOB], [CreatedDate]) VALUES (2, 2, N'dev', N'dev@gmail.com', CAST(N'1994-05-05T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Users] ([ID], [Type], [Username], [Email], [DOB], [CreatedDate]) VALUES (3, 1, N'truongtuananh', NULL, NULL, NULL)
INSERT [dbo].[Users] ([ID], [Type], [Username], [Email], [DOB], [CreatedDate]) VALUES (5, 1, N'diem', NULL, NULL, NULL)
INSERT [dbo].[Users] ([ID], [Type], [Username], [Email], [DOB], [CreatedDate]) VALUES (6, 1, N'fsf', NULL, NULL, NULL)
INSERT [dbo].[Users] ([ID], [Type], [Username], [Email], [DOB], [CreatedDate]) VALUES (7, 1, N'csc', NULL, NULL, NULL)
INSERT [dbo].[Users] ([ID], [Type], [Username], [Email], [DOB], [CreatedDate]) VALUES (8, 1, N'johndoe', NULL, NULL, NULL)
INSERT [dbo].[Users] ([ID], [Type], [Username], [Email], [DOB], [CreatedDate]) VALUES (9, 1, N'john.doe', NULL, NULL, NULL)
INSERT [dbo].[Users] ([ID], [Type], [Username], [Email], [DOB], [CreatedDate]) VALUES (10, 1, N'rf', NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[Users] OFF
ALTER TABLE [dbo].[Products] ADD  CONSTRAINT [DF_Products_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[Reviews] ADD  CONSTRAINT [DF_Reviews_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO
/****** Object:  StoredProcedure [dbo].[usp_Products_GetAll]    Script Date: 9/8/2019 8:12:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[usp_Products_GetAll]
	@BrandId INT
AS BEGIN
	SET NOCOUNT ON;	
	--------------------------------------------------
	BEGIN TRY
		IF(@BrandId = 0)
			SELECT TOP (10) p.*, b.[Name] as 'BrandName' FROM [dbo].[Products] p inner join [dbo].[Brands] b
			ON p.[BrandID] = b.[ID]
			ORDER BY p.[CreatedDate] DESC	
		ELSE
			SELECT TOP (10) p.*, b.[Name] as 'BrandName' FROM [dbo].[Products] p inner join [dbo].[Brands] b
			ON p.[BrandID] = b.[ID]
			WHERE p.[BrandID] = @BrandId
			ORDER BY p.[CreatedDate] DESC					
	END TRY
	BEGIN CATCH
		THROW;
	END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[usp_Products_GetById]    Script Date: 9/8/2019 8:12:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[usp_Products_GetById]
	@Id INT
AS BEGIN
	SET NOCOUNT ON;	
	--------------------------------------------------
	BEGIN TRY	
			SELECT TOP (10) p.*, b.[Name] as 'BrandName' FROM [dbo].[Products] p inner join [dbo].[Brands] b
			ON p.[BrandID] = b.[ID]
			WHERE p.[Id] = @Id
			ORDER BY p.[CreatedDate] DESC					
	END TRY
	BEGIN CATCH
		THROW;
	END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[usp_Reviews_Create]    Script Date: 9/8/2019 8:12:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[usp_Reviews_Create]	
	@Username NVARCHAR(250),
	@ProductId INT,
	@Comment NVARCHAR(MAX),
	@Rating INT
AS BEGIN	
	DECLARE @result AS INT
	DECLARE @userId AS INT
	BEGIN TRY
		SET @result = -1

		SELECT @userId = u.ID FROM [dbo].[Users] u WHERE [Username] = @Username

		IF @userId IS NULL
		BEGIN
		   INSERT INTO [dbo].[Users]
					   ([Type]
					   ,[Username]
					   )
				 VALUES
					   (1
					   ,@Username)
		   SET @userId = CAST(SCOPE_IDENTITY() AS INT)
		   
		END	

		INSERT INTO [dbo].[Reviews]
					   ([Rating]
					   ,[Comment]					  
					   ,[ProductID]
					   ,[UserID])
				 VALUES
					   (@Rating
					   ,@Comment					  
					   ,@ProductId
					   ,@userId)

			SET @result = CAST(SCOPE_IDENTITY() as int)
			SELECT @result

	END TRY
	BEGIN CATCH
		THROW;
	END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[usp_Reviews_GetByProductId]    Script Date: 9/8/2019 8:12:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[usp_Reviews_GetByProductId]
	@ProductId INT
AS BEGIN
	SET NOCOUNT ON;	
	--------------------------------------------------
	BEGIN TRY
		SELECT r.[Comment] as 'ReviewSummary', r.[Rating], u.Username FROM [dbo].[Reviews] r INNER JOIN [dbo].[Users] u 
		ON r.[UserID] = u.[ID]
		WHERE r.[ProductID] = @ProductId
		ORDER BY r.[CreatedDate] DESC				
	END TRY
	BEGIN CATCH
		THROW;
	END CATCH
END
GO
