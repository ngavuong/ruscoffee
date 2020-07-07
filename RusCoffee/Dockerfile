#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["RusCoffee/RusCoffee.csproj", "RusCoffee/"]
COPY ["RusCoffee.DL/RusCoffee.DL.csproj", "RusCoffee.DL/"]
COPY ["RusCoffee.Entities/RusCoffee.Entities.csproj", "RusCoffee.Entities/"]
COPY ["RusCoffee.BL/RusCoffee.BL.csproj", "RusCoffee.BL/"]
RUN dotnet restore "RusCoffee/RusCoffee.csproj"
COPY . .
WORKDIR "/src/RusCoffee"
RUN dotnet build "RusCoffee.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "RusCoffee.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "RusCoffee.dll"]